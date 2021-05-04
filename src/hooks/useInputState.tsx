import {FormEvent, HtmlHTMLAttributes, useState} from "react";
import Joi from "joi";

export default (initialValue: string): [string, (e: FormEvent<HTMLInputElement>)=>void, ()=>void] => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.name);
        setValue(e.currentTarget.value);
    }

    const reset = () => {
        setValue("");
    }

    return [value, handleChange, reset];
}