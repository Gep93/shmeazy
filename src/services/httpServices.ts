import axios from "axios";
import {IShoppingList} from "../../types";

declare module 'axios' {
    export interface AxiosRequestConfig {
      'x-auth-token': string;
      data?: any
    }
  }

interface Idata {
    username?:string,
    email: string,
    password: string
}

//const DOMAIN = "localhost:5000";
const DOMAIN = "93.103.76.8:5000";

const authenticateUser = async (data: Idata): Promise<any> => {
    try {
        const {data: jwt} = await axios.post(`http://${DOMAIN}/api/auth`, data);
        console.log("auth jwt", jwt);
        return jwt;
    } catch(err) {
        console.log(err);
    }
}

const createNewUser = async (data: Idata): Promise<any> => {
    const {username, email, password} = data;
    try {
        const user = await axios.post("http://localhost:5000/api/users", {username, email, password});
        return user;
    } catch(err) {
        console.log(err);
    }
}

/**
 * Creates a http get request for shopping list with given ID.
 * 
 * @param {string} token Valid JWT token.
 * @param {string} id ID of a list to get.
 * @returns 
 */
export const getShoppingList = async (token: string, id: string): Promise<any> => {
    axios.defaults.headers.common['x-auth-token'] = token;
    try {
        const {data} = await axios.get(`http://localhost:5000/lists/${id}`);
        
        return data.list;
    } catch (err) {
        console.log(err);
    }
}

/**
 * Creates a http get request for all shopping lists of a given user.
 * 
 * @param {string} token Valid JWT token.
 * @returns 
 */
export const getShoppingLists = async (token: string): Promise<any> => {
    axios.defaults.headers.common['x-auth-token'] = token;
    try {
        const {data} = await axios.get(`http://${DOMAIN}/lists`);
        return data.lists;
    } catch (err) {
        console.log(err);
    }
}

export const addNewShoppingList = async (token: string, _list: IShoppingList): Promise<any> => {
    axios.defaults.headers.common['x-auth-token'] = token;
    try {
        const {data} = await axios.post("http://localhost:5000/lists", {list: _list});
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}

export const updateShoppingList = async (token: string, body: {list: IShoppingList}, id: string) : Promise<any> => {
    axios.defaults.headers.common['x-auth-token'] = token;
    try {
        const data = await axios.put(`http://localhost:5000/lists/${id}`, body);
        return data;
    } catch (err) {
        console.log(err);
    }
}

export const updateShoppingLists = async (token: string, body: {lists: IShoppingList[]}) : Promise<any> => {
    axios.defaults.headers.common['x-auth-token'] = token;
    try {
        const data = await axios.put(`http://localhost:5000/lists`, body);
        return data;
    } catch (err) {
        console.log(err);
    }
}

export const updateList = async (token: string, oldCreated: string, newList: IShoppingList ): Promise<any> => {
    axios.defaults.headers.common['x-auth-token'] = token;
    try {
        const {data} = await axios.put("http://localhost:5000/api/lists", {created: oldCreated, list: newList});
        console.log(data);
        return data;
    } catch(err) {
        console.log(err);
    }
}

/**
 * Creates a http delete request for a shopping list with given ID.
 * 
 * @param {string} token Valid JWT token.
 * @param {string} id ID of a list to delete.
 * @returns 
 */
export const deleteShoppingList = async (token: string, id: string): Promise<any> => {
    axios.defaults.headers.common['x-auth-token'] = token;
    try {
        // const {data} = await axios.delete(`http://localhost:5000/api/lists/${id}`);
        const data = await axios.delete(`http://localhost:5000/lists/${id}`);
        return data;
        // return data;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Creates a http delete request for all lists of a given user.
 * 
 * @param {string} token Valid JWT token.
 * @returns 
 */
export const deleteShoppingLists = async (token: string): Promise<any> => {
    axios.defaults.headers.common['x-auth-token'] = token;
    try {
        const {data} = await axios.delete("http://localhost:5000/api/lists");
        return data;
    } catch (err) {
        
    }
}

export default authenticateUser;
export {createNewUser};