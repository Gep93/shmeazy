import axios from "axios";

declare module 'axios' {
    export interface AxiosRequestConfig {
      'x-auth-token': string;
    }
  }

interface Idata {
    username?:string,
    email: string,
    password: string
}

const authenticateUser = async (data: Idata): Promise<any> => {
    try {
        const {data: jwt} = await axios.post("http://localhost:5000/api/auth", data);
        // console.log(jwt);
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

const getLists = async (token: string): Promise<any> => {
    axios.defaults.headers.common['x-auth-token'] = token;
    try {
        const lists = await axios.post("http://localhost:5000/api/lists", {});
        return lists;
    } catch(err) {
        console.log(err);
    }
}

export default authenticateUser;
export {createNewUser, getLists};