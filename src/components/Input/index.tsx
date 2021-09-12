import { FormEvent } from "react";
import FlexContainer from "../FlexContainer";

const Input = ({name, type, value, labelClass, inputClass, spanClass, label, input, info, onChange, id}:any) => {

    const handleChange = (e: FormEvent) => {
        onChange(e);
    }

    return(
        <div>
            <FlexContainer height="auto" padding="0px" row spaceBetween>
                <label htmlFor={id} className={labelClass}>{label}</label>
                <input id={id} className={inputClass} name={name} type={type} value={value} onChange={handleChange}>{input}</input>
            </FlexContainer>
            <span className={spanClass}>{info}</span>
        </div>
    );
}

export default Input;