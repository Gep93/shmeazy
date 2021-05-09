import axios from "axios";

interface Idata {
    username?:string,
    email: string,
    password: string
}

const authenticateUser = async (data: Idata): Promise<any> => {
    try {
        const {data: jwt} = await axios.post("http://localhost:5000/api/auth", data);
        console.log(jwt);
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

export default authenticateUser;
export {createNewUser};