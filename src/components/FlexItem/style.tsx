import styled from "styled-components";

const alignSelf = (props: any) => {
    if(props.alignEnd)
        return "flex-end";
    if(props.alignStart)
        return "flex-start";
    if(props.alignCenter) 
        return "center";
}

const justifySelf = (props: any) => {
    if(props.justifyEnd)
        return "flex-end";
    if(props.justifyStart)
        return "flex-start";
    if(props.justifyCenter) 
        return "center";
}

interface IProps {
    width?: string,
    maxWidth?: string,
    fontSize?: string,
    zIndex?: string,
    position?: string,
    left?: string,
    right?: string
}

export const StyledFlexItem = styled.div<IProps>`
    width:${props => props.width ? props.width : "auto"};
    max-width: ${props => props.maxWidth ? props.maxWidth : "auto"};
    align-self: ${props => alignSelf(props) ? alignSelf(props) : ""};
    justify-self: ${props => justifySelf(props) ? justifySelf(props) : ""}; 
    font-size: ${props => props.fontSize ? props.fontSize : "auto"};
    z-index: ${props => props.zIndex ? props.zIndex : 'auto'};
    position: ${props => props.position ? props.position : ""};
    left: ${props => props.left ? props.left : ""};
    right: ${props => props.right ? props.right : ""}
`;