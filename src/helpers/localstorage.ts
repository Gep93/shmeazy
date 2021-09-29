const localStorageAvailable = () : boolean => {
    try {
        localStorage.setItem("shmeazyTest", "shmeazyTest");
        localStorage.removeItem("shmeazyTest");
        return true;
    } catch (err) {
        return false;
    }
}

const localStorageHasJWT = (): boolean => {
    try {
        console.log(typeof localStorage.getItem("jwt"));
        if(localStorage.getItem("jwt") !== 'null' && localStorage.getItem("jwt") !== 'undefined')
            return true;
        return false;
        // return localStorage.getItem("jwt") ? true : false;
    } catch(err) {
        return false;
    }
}

const deleteJWT = () => {
    localStorage.setItem("jwt", "");
}

export default localStorageAvailable;
export {localStorageHasJWT, deleteJWT};