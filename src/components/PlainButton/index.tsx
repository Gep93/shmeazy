import React from "react";
import {PlainStyledButton} from "./style";

const PlainButton = ({children, onClick}: {children: HTMLCollection | string, onClick: (e?: React.MouseEvent) => void}) => {

    const handleClick = (e?: React.MouseEvent) => {
        onClick(e);
    }

    return(
        <PlainStyledButton onClick={handleClick}>{children}</PlainStyledButton>
    );
}

export default PlainButton;