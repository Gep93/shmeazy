import { FormEvent } from "react";

const Input = ({name, type, value, labelClass, inputClass, spanClass, label, input, info, onChange, id}:any) => {

    const handleChange = (e: FormEvent) => {
        onChange(e);
    }

    return(
        <div>
            <label htmlFor={id} className={labelClass}>{label}</label>
            <input id={id} className={inputClass} name={name} type={type} value={value} onChange={handleChange}>{input}</input>
            <span className={spanClass}>{info}</span>
        </div>
    );
}

export default Input;