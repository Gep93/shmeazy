import {useState} from "react";

const useToggleState = (initialVal: boolean): [boolean, () => void] => {
    const [toggleState, setToggleState] = useState<boolean>(initialVal);

    const toggle = () => {
        setToggleState(!toggleState);
    }

    return [toggleState, toggle];
}

export default useToggleState;