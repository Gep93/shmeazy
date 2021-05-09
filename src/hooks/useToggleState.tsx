import {useState} from "react";

export default (initialVal: boolean): [boolean, () => void] => {
    const [toggleState, setToggleState] = useState<boolean>(initialVal);

    const toggle = () => {
        setToggleState(!toggleState);
    }

    return [toggleState, toggle];
}