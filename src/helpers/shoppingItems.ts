import { IItem, IShoppingList } from "../../types";
import { updateShoppingList } from "../services/httpServices";
import _ from "lodash";

const saveShoppingItem = async (list:IShoppingList, _item: IItem, token: string, id: string) => {
    let newList: IShoppingList | null = null;
    if(!_item._id?.toString()) {
        newList = {...list, items: [...list.items, _item]};
    }
    else {
        const items = list.items.map(item => {
            if(item._id === _item._id) return _item;
            return item;
        });
        newList = {...list, items}
    }
    try {
        // const {data} = await saveList(token, newList);
        const {data} = await updateShoppingList(token, {list: newList}, id);
        return data;
    } catch (err) {
        throw new Error("400");
    }
}

export const deleteShoppingItems = async (list: IShoppingList, ids: string[], token: string, id: string) => {
    if(!ids) return list;
    let newList: IShoppingList;
    const _items = list.items.filter(item => !ids.includes(item._id!));
    newList = {...list, items: _items}
    try {
        const {data} = await updateShoppingList(token, {list: newList}, id);
        return data;
    } catch(err) {
        console.log("deleteShoppingItems error: ", err);
    }
}

export const deleteShoppingItem = async (list: IShoppingList, _id: string, token: string, id: string) => {
    if(!id) return list;
    let newList: IShoppingList;
    const _items = list.items.filter(item => !_id.includes(item._id!));
    newList = {...list, items: _items}
    try {
        const {data} = await updateShoppingList(token, {list: newList}, id);
        return data;
    } catch(err) {
        console.log("deleteShoppingItem error: ", err);
    }
}

const filterItemsById = (ids: string[]) => {

}

// toggles property "checked" of an item in a list
export const toggleAndSortCheckedItem = async (id: string, list: IShoppingList, token: string, listId: string) => {
    const _items = list.items.map(item => {
        if(item._id === id)  return {...item, checked: !item.checked};
        return item;
    });
    const sortedItems = sortCheckedItems(_items);
    const newList = {...list, items: sortedItems};

    try {
        // const {data} = await saveList(token, newList);
        const {data} = await updateShoppingList(token, {list: newList}, listId);
        return data;
    } catch (err) {
        console.log("toggleCheckedItem error: ",err);
    }
}

export const moveItemToEnd = (id: string, list: IShoppingList) => {
    const element = list.items.find(element => element._id === id);
    if(!element) return;
    
    const index = list.items.indexOf(element);
    const _items = [...list.items];
    _items.push(_items.splice(index, 1)[0]);
}

export const sortCheckedItems = (items: IItem[]) => {
    let _checkedItems : IItem[] = [];
    let _items : IItem[] = [];
    items.forEach(item => {
        if(item.checked) return _checkedItems.push(item);
        _items.push(item);
    });
    const sortedItems =[..._items!, ..._checkedItems!];
    return sortedItems;
}

// Premakni drugam
let firstClick : number = 0;
let doubleClickTimer : null | ReturnType<typeof setTimeout>;
export const isDoubleClick = () => {
    if(!firstClick) {
        firstClick = Math.floor(Date.now() / 1000);
        doubleClickTimer = setTimeout(() => {
            clearTimeout(doubleClickTimer!);
            doubleClickTimer = null;
            firstClick = 0;
        }, 300);
        return false;
    }

    const secondClick = Math.floor(Date.now() / 1000);
    clearTimeout(doubleClickTimer!);
    const doubleClick = secondClick - firstClick < 300 ? true : false;
    firstClick = 0;
    return doubleClick;
}

export const isSameAsOld = (list: IShoppingList, oldList: IShoppingList) => {
    if(_.isEqual(list, oldList)) return true;
    return false;
}

export const CLICK = {
    SINGLE: "SingleClick",
    DOUBLE: "DoubleClick"
}

export default saveShoppingItem;
