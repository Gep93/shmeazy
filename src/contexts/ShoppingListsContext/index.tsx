import {createContext, DOMElement, useContext, useState} from "react";
import ShoppingList from "../../components/ShoppingList";
import { updateList } from "../../services/httpServices";

import {IItem, IShoppingList, IShoppingLists} from "../../../types";

interface IShoppingListsContext {
    lists: null | IShoppingLists,
    currentShoppingList: IShoppingList,
    // setLists: (lists: IShoppingLists) => void 
    updateLists: (lists: IShoppingList) => Promise<boolean> | null, 
    // updateCurrentList: (list: IShoppingList) => void,
    updateCurrentList: (callback: IShoppingList | ((prevList: IShoppingList) => IShoppingList)) => void,
    setLists: (lists: IShoppingLists) => void,
    setCurrentShoppingList: (list: IShoppingList) => any
}

const initShoppingList = {name: "", created:"", items: []};
const initVal = {lists: null, currentShoppingList: initShoppingList, updateLists: () => null, updateCurrentList: () => console.warn("no list"), setLists: () => null, setCurrentShoppingList: () => null}

export const ShoppingListsContext = createContext<IShoppingListsContext>(initVal);
export function ShoppingListsProvider({children, ...rest}:{children: HTMLElement | HTMLElement[] | JSX.Element[]}) {
    const [lists, setShoppingLists] = useState<IShoppingLists | null>(null);
    const [currentShoppingList, setCurrentShoppingList] = useState<IShoppingList>({name: "", created:"", items: []});
    
    const setLists = (lists: IShoppingLists) => {
        setShoppingLists(lists);
    }

    const updateCurrentList = (callback: IShoppingList | ((prevList: IShoppingList) => IShoppingList)) => {
        setCurrentShoppingList(callback);
    }

    const updateLists = async (newList: IShoppingList): Promise<boolean> => {
        let shoppingLists = [];
        if(!newList!._id?.toString()) 
            shoppingLists=[...lists!.shoppingLists, newList];
        else
            shoppingLists=lists!.shoppingLists.map(list => {
                if(list._id === newList._id) return newList;
                return list;
            })

        // odkomentiraj po potrebi
        // const {data} = await saveList(localStorage.getItem("jwt")!, {shoppingLists});
        // if(!data) return false;

        // setShoppingLists(data);
        // if(!currentShoppingList._id?.toString())
        //     setCurrentShoppingList(data.shoppingLists[data.shoppingLists.length-1]);
        return true;
    }

    const clearLists = (newLists: IShoppingLists) => {
        setShoppingLists(null);
    }

    return(
        <ShoppingListsContext.Provider {...rest} value={{lists, currentShoppingList, updateLists, updateCurrentList, setLists, setCurrentShoppingList}}>
            {children}
        </ShoppingListsContext.Provider>
    );
}
export const useShoppingLists = () => useContext(ShoppingListsContext);