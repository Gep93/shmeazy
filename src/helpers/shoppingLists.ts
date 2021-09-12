import { IShoppingList } from "../../types";
import { updateShoppingLists } from "../services/httpServices";

const deleteShoppingLists = async (lists: IShoppingList[], ids: string[], token: string) => {
    if(!ids) return lists;
    // let newList: IShoppingList[];
    const newLists = lists.filter(list => !ids.includes(list._id as string));
    console.log("LISTS", newLists);
    // newList = _lists
    try {
        // const {data} = await saveList(token, newList);
        const {data} = await updateShoppingLists(token, {lists: newLists});
        console.log(data);
        return data;
    } catch(err) {
        console.log("deleteShoppingItems error: ", err);
    }
}

export default deleteShoppingLists;