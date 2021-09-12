import {createContext} from "react";

interface ILists {
    _id: string,
    shoppingLists: IList[]
}

interface IList {
    name: string,
    created: string,
    quantity: string,
    unit: string,
    packaging: string,
    note: string
}

export const ShoppingListsContext = createContext<null | ILists[]>(null);