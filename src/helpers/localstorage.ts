const localStorageAvailable = () : boolean => {
    try {
        localStorage.setItem("shmeazyTest", "shmeazyTest");
        localStorage.removeItem("shmeazyTest");
        return true;
    } catch (err) {
        return false;
    }
}

export default localStorageAvailable;