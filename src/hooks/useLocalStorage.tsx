export const useLocalStorage = () => {
    // const [token, setToken] = useState<string | null>(null);

    const localStorageAvailable = () : boolean => {
        try {
            localStorage.setItem("shmeazyTest", "shmeazyTest");
            localStorage.removeItem("shmeazyTest");
            return true;
        } catch (err) {
            return false;
        }
    }
    
    const localStorageHasJWT = () => {
        try {
            const token = localStorage.getItem("jwt");
            return token ? true : false;
        } catch(err) {
            return false;
        }
    }

    const saveTokenToLocalStorage = (token: string) => {
        if(!localStorageAvailable)
            return alert("Localstorage not available!!, To use this app please enable localStorage");
        localStorage.setItem("jwt", token); //shmeazy_jwt
    }

    const getJWT = () => {
        return localStorage.getItem("jwt")!;
    }

    return {saveTokenToLocalStorage, localStorageHasJWT, localStorageAvailable, getJWT};  
}