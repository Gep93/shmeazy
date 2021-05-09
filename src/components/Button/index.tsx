import { isTypeLiteralNode } from "typescript";

interface Istyles {
    [key:string]: string
}

const Button = (props: any) => {
    let styles: Istyles = {
        width: "100%",
        border: "0",
        padding: "10px",
        borderRadius: "10px",
        background: "white",
        fontWeight:"bold",
        cursor:"pointer",
    }

    if(props.style)
        styles = {...styles, ...props.style}


    const handleClick = () => {
        props.onClick && props.onClick();
    }

    return (
        <button style={styles} type={props.type} onClick={handleClick}>{props.children}</button>
    );
}

export default Button;