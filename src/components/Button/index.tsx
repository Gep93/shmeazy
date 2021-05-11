import React from "react";
import { isTypeLiteralNode } from "typescript";
import {StyledButton} from './style';

interface IbuttonAttributes {
    color?: string,
    border?: string,
    padding?: string,
    width?: string,
    borderRadius?: string,
    background?: string,
    fontWeight?: string,
    cursor?: string
}

type ButtonComponentProps = {
    children?: HTMLCollection | string,
    width?: string,
    onClick?: (e?: React.MouseEvent) => void
  } & React.ButtonHTMLAttributes<HTMLButtonElement> & IbuttonAttributes;
const Button = ({children, type, ...rest}: ButtonComponentProps) => {

    const handleClick = () => {
        rest.onClick && rest.onClick();
    }

    return (
        <StyledButton type={type} {...rest} onClick={handleClick}>{children}</StyledButton>
    );
}

export default Button;