import { useReducer } from "react";
import { IShoppingList } from "../../types";

export const useItemsReducer = (initialState: IShoppingList | null) => {
    const [list, dispatch] = useReducer(reducer, initialState);

    function reducer(state: any, action: any) {
        switch(action.type) {
            case 'UPDATE_LIST':
                return action.list;
            default:
                return state;
        }
    }

    return [list, dispatch];
}