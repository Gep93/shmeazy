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
        return localStorage.getItem("jwt") ? true : false;
    } catch(err) {
        return false;
    }
}

const deleteJWT = () => {
    localStorage.setItem("jwt", "");
}

export default localStorageAvailable;
export {localStorageHasJWT, deleteJWT};