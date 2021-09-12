import {FormEvent, HtmlHTMLAttributes, useState} from "react";
import Joi from "joi";

export default (initialValue: string): [string, (e: FormEvent<HTMLInputElement>)=>void, ()=>void] => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    const reset = () => {
        setValue("");
    }

    return [value, handleChange, reset];
}