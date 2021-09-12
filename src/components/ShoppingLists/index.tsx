import Font from "../Font/index";
import ScrollY from "../ScrollY";
import BigHeader from "../BigHeader";
import FlexContainer from "../FlexContainer/index";
import HorizontalSpacer from "../HorizontalSpacer";
import VerticalSpacer from "../VerticalSpacer";
import ShoppingListCard from "../ShoppingLists/ShoppingListCard/index";
import {v4 as uuidv4} from "uuid";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {addNewShoppingList, getShoppingLists} from "../../services/httpServices";
import {localStorageHasJWT} from "../../helpers/localstorage";
import PopupContainer from "../PopupContainer";
import useToggleState from "../../hooks/useToggleState";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useIdsReducer } from "../../hooks/useIdsReducer";
import deleteShoppingLists from "../../helpers/shoppingLists";
import { IShoppingList } from "../../../types";
//.blue::-webkit-scrollbar {
    //display: none;
//}

const ShoppingLists = () => {
    const {getJWT} = useLocalStorage();
    const [lists, setLists] = useState<IShoppingList[] | null>(null); //{name:string, created: string, _id: string}
    const [show, toggleShow] = useToggleState(false);
    const [ids, updateIds] = useIdsReducer([]);
    const [deleteMany, toggleDeleteMany] = useToggleState(false);

    useEffect(() => {
        if(!localStorageHasJWT()) return; 
        (async() => {
            const token: string = localStorage.getItem("jwt") as string;
            const lists = await getShoppingLists(token);
            setLists(lists);
        })();
    }, []);

    const history = useHistory();

    const handleClick = (id: string) => {
        history.push(`/shopping-list/${id}`)
    }

    const handleCancel = () => {
        toggleShow();
    }

    const handleConfirm = async (target:any) => {
        try {
            const data = await addNewShoppingList(getJWT(), {name: target, created: Date.now().toString(), items: []});
            if(!data || !data.hasOwnProperty("lists")) return alert("Something went wrong with saving lists, try again!");
            const newLists = data.lists;
            setLists(newLists);
            toggleShow();
        }
        catch (err) {
            console.log("ERR", err);
        }
    }

    const addList = (e: React.MouseEvent) => {
        e.preventDefault();
        toggleShow();
    }

    const doDeleteMany = () => {
        toggleDeleteMany();
    }

    const closeDeleteMany = () => {
        updateIds({type:'DELETE_ALL'});
        toggleDeleteMany();
    }

    const deleteSelectedLists = async () => {
        const data = await deleteShoppingLists(lists!, ids, getJWT());
        if(!data.lists) return alert("Something went wrong. Try saving the item again."); 
        setLists(data.lists);
        toggleDeleteMany();
    }

    let toolbar = 
    <FlexContainer row padding="0" height="auto">
    <i className="fas fa-plus" onClick={addList}></i>
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
            <i className="fas fa-check" onClick={deleteSelectedLists}></i>
        </FlexContainer>;
    }

    return (
        <FlexContainer>
            <PopupContainer show={show}>
                <PopupContainer.ShoppingListTitleForm cancel={handleCancel} confirm={handleConfirm}/>
            </PopupContainer>
            <BigHeader pTop="30px">Shopping Lists</BigHeader>
            <Font fontSize="ShmeazyMedium">
                <FlexContainer row spaceBetween height="auto" padding="0 10px 40px 10px">
                        <span>My Lists</span>
                        {toolbar}
                        {/* <FlexContainer row padding="0" height="auto">
                            <i className="fas fa-plus" onClick={addList}></i>
                            <HorizontalSpacer />
                            <i className="far fa-clock"></i>
                            <HorizontalSpacer />
                            <i className="fas fa-trash" onClick={doDeleteMany}></i>
                        </FlexContainer> */}
                </FlexContainer>               
            </Font>
                <ScrollY>
                    {lists && lists.map((list: IShoppingList, i: number) => {//{name: string, created: string, _id: string}
                        const {_id, name, created} = list;
                            return(
                                <>
                                    <ShoppingListCard id={_id as string} key={uuidv4()} click={handleClick} updateIds={updateIds} toDelete={ids.includes(_id)} deleteMany={deleteMany} shmeazyLightBlack name={name} created={created} />
                                    <VerticalSpacer key={uuidv4()} smallSpacer/>
                                </>
                            );
                        })
                    }
                </ScrollY>
        </FlexContainer>
    );
}

export default ShoppingLists;