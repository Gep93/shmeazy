import Joi from "joi";

export interface IItem {
    _id?: string,
    name: string,
    quantity: string,
    unit: string,
    packaging: string,
    note: string,
    checked: boolean
}

export interface IShoppingList {
    _id?: string | number,
    name:string, 
    created: string,
    items: IItem[]
}

export interface IShoppingLists {
    shoppingLists: IShoppingList[]
}

export interface ICard {
    // id: string,
    // name: string, 
    // quantity: string,
    // packaging: string,
    // checked: boolean,
    item: IItem,
    toDelete: boolean,
    deleteMany: boolean,
    showDelete?: boolean,
    expandItem: boolean,
    clickItem?: (id: string)=>void,
    singleClick?: (id?: string)=>void,
    doubleClick?: (id: string)=>void,
    saveItem?: () => void, 
    editItem?: (id:string)=>void,
    checkItem?: (id: string)=>void,
    updateIds: ({type, id}:{type: string, id: string})=>void;
}

export interface IScroll {
    items: IItem[],
    ids: string[],
    deleteMany: boolean,
    // expandItem: boolean,
    expandedId: string | null,
    clickItem?: (id: string)=>void,
    singleClick?: (id?: string)=>void,
    doubleClick?: (id: string)=>void,
    updateIds: ({type, id}:{type: string, id: string})=>void,
    editItem?: (id:string)=>void,
}

export interface ISlideInfo {
    mouseDown: boolean,
    initX: number,
    initY: number,
    item: any,
    itemWidth: number,
    topLeftX: number,
    slideX: boolean,
    slideY: boolean,
    speed: null | number,
    initialDirection: number
}

export interface IData {
    username?: string,
    email: string,
    password: string
}

export interface IErrors {
    [key: string]: string
}
  
export interface ISchema {
    [key: string]: Joi.StringSchema | Joi.AnySchema,
}

export interface _ISlideInfo {
    mouseDown: boolean,
    initX: number,
    initY: number,
    item: any,
    itemWidth: number,
    topLeftX: number,
    slideX: boolean,
    slideY: boolean,
    speed: null | number,
    initialDirection: number
    sliding: boolean
}