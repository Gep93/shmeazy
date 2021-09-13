import React, { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";
import BigHeader from "../BigHeader";
import FlexContainer from "../FlexContainer";
import ScrollY from "../ScrollY";
import VerticalSpacer from "../VerticalSpacer";
import {v4 as uuidv4} from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import useToggleState from "../../hooks/useToggleState";
import HorizontalSpacer from "../HorizontalSpacer";
import ShoppingItem from "./ShoppingItem";
import { useTheme } from "../../contexts/ThemeProvider";
import _ from "lodash";

import { deleteShoppingList, getShoppingList, updateShoppingLists } from "../../services/httpServices";
// import {localStorageHasJWT} from "../../helpers/localstorage";

import {IItem, IShoppingList, IShoppingLists} from "../../../types";
import  {useLocalStorage}  from "../../hooks/useLocalStorage";
import { useItemsReducer } from "../../hooks/useItemsReducer";
import saveShoppingItem, {deleteShoppingItems, deleteShoppingItem, toggleAndSortCheckedItem, isDoubleClick} from "../../helpers/shoppingItems";
import { useIdsReducer } from "../../hooks/useIdsReducer";
import ScrollHandler from "../Common/ScrollHandler";
import ScrollYSlideX from "../ScrollYSlideX";

const ShoppingList = () => {

const {theme} = useTheme();
const location = useLocation();
const history = useHistory();
const [list, dispatch] = useItemsReducer(null);
const [ids, updateIds] = useIdsReducer([]);
const [listId, setId] = useState<string>("");
// const [sliding, toggleSliding] = useToggleState(false);
const sliding = useRef(false);


const {saveTokenToLocalStorage, localStorageHasJWT, getJWT} = useLocalStorage();

useEffect(() => {
    const splitPath = location.pathname.split("/");
    const _id = splitPath[splitPath.length-1];
    setId(_id);
    // if(!localStorageHasJWT()) return history.push("/");
    (async() => {
        const token: string = localStorage.getItem("jwt") as string;
        const list = await getShoppingList(token, _id);
        dispatch({type:'UPDATE_LIST', list: list});
    })();
}, []);

const itm = {_id:"", name:"", packaging:"", unit:"", quantity:"", note:"", checked: false};
const [showForm, toggleShowForm] = useToggleState(false);
const [deleteMany, toggleDeleteMany] = useToggleState(false);
const [currentItem, setCurrentItem] = useState<IItem | null>(itm);
const [expandedId, setExpandedId] = useState<string | null>(null);

const toggleForm = () => {
    toggleShowForm();
    setCurrentItem(null);
}

const editItem = (id: string) => {
    const _list = list as unknown as IShoppingList
    const _item = _list.items.find(item => item._id === id);
    if(_item === null) return;
    setCurrentItem(_item!);
    toggleShowForm();
}

const saveItem = async (item: IItem) => {
    const data = await saveShoppingItem(list!, item, getJWT(), listId);
    if(!data.list) return alert("Something went wrong. Try saving the item again.");
    dispatch({type:'UPDATE_LIST', list: data.list});
    toggleShowForm();
    setCurrentItem(null);
}

const doDeleteMany = () => {
    toggleDeleteMany();
}

const deleteSingle = async (id: string) => {
    const data = await deleteShoppingItem(list, id, getJWT(), listId);
    if(!data.list) return alert("Something went wrong. Try deleting the item again."); // newList always true because it is a promise?
    dispatch({type:'UPDATE_LIST', list: data.list});
}

const closeDeleteMany = () => {
    updateIds({type:'DELETE_ALL'});
    toggleDeleteMany();
}

const createItem = () => {
    setCurrentItem({name:"", packaging:"", unit:"", quantity:"", note:"", checked: false});
    toggleShowForm();
}

const deleteItems = async () => {
    const data = await deleteShoppingItems(list, ids, getJWT(), listId);
    if(!data.list) return alert("Something went wrong. Try saving the item again."); // newList always true because it is a promise?
    dispatch({type:'UPDATE_LIST', list: data.list});
    updateIds('REMOVE_ALL');
    toggleDeleteMany();
}

const singleClick = (id?: string) => {
    if(sliding.current) return sliding.current = false;
    if(!id || id === expandedId) return setExpandedId(null); //setExpandedId(null) if y scroll.
    setExpandedId(id);
}

const doubleClick = async (id: string) => {
    let data: {list: IShoppingList} = await toggleAndSortCheckedItem(id, list, getJWT(), listId);
    if(!data.list) return alert("Something went wrong. Try saving the item again.");
    data.list.items.find(item => item._id === id)!.checked! === true && setExpandedId(null);
    dispatch({type: 'UPDATE_LIST', list: data.list});
}

let toolbar = 
    <FlexContainer row padding="0" height="auto">
    <i className="fas fa-plus" onClick={createItem}></i>
    <HorizontalSpacer />
    <i className="far fa-clock"></i>
    <HorizontalSpacer />
    <i className="fas fa-trash" onClick={doDeleteMany}></i>
    </FlexContainer>;

if(deleteMany) {
toolbar = 
    <FlexContainer row padding="0" height="auto">
        <i className="fas fa-times" aria-hidden="true" onClick={closeDeleteMany}></i>
    <HorizontalSpacer />
        <i className="fas fa-check" onClick={deleteItems}></i>
    </FlexContainer>;
}

return(
    list &&
    <FlexContainer>
        <BigHeader pTop="30px">{list!.name}</BigHeader>
        <FlexContainer fontSize={theme.fontSize.shmeazyNormal} row spaceBetween height="auto" padding="0 10px 40px 10px">
                <span style={{cursor: "pointer"}} onClick={()=>history.push("/shopping-lists")}>Home</span>
                {toolbar}
        </FlexContainer> 
        <>
        <ScrollYSlideX  
            items={list.items}
            ids={ids}
            editItem={editItem} 
            updateIds={updateIds} 
            deleteMany={deleteMany} 
            expandedId={expandedId}
            singleClick={singleClick} 
            doubleClick={doubleClick}
            deleteSingle={deleteSingle}
            sliding={sliding}
         />
         {showForm && 
            <ShoppingItem key={uuidv4()}>
                    <ShoppingItem.Form saveItem={saveItem} cancelForm={toggleForm} currentItem={currentItem as IItem & {[key:string]: string}} inputs={["name", "quantity", "unit", "packaging"]} textAreas={["note"]}/>
            </ShoppingItem>}
        </>
    </FlexContainer>
);
}
//use memo to prevent rendering all items in a list when editing or creating new item?
export default ShoppingList;
