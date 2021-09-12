import styled from "styled-components";

interface IFlexContainer {
    height?: string,
    minHeight?: string,
    row?: boolean | undefined,
    fontSize: string,
    background?: string,
    [key: string]: any,
}   

const justifyContent = (props: any) => {
    if(props.center)
        return "center";  
    if(props.flexStart)
        return "flex-start";  
    if(props.flexEnd)
        return "flex-end";      
    if(props.spaceBetween)
        return "space-between";
    if(props.spaceAround)
        return "space-around";   
    if(props.spaceEvenly)
        return "space-evenly";  
    if(props.spaceAround)
        return "space-around";  
    if(props.spaceAround)
        return "space-evenly";
    return "";
}



export const StyledFlexContainer = styled.div<IFlexContainer>`
    height: ${props => props.height ? props.height : '100vh'};
    min-height: ${props => props.minHeight ? props.minHeight : ''};
    width:${props => props.width ? props.width : 'auto'};
    color: ${props => props.color ? props.color : props.theme.color.shmeazyWhite};
    display: flex;
    font-size:${props => props.fontSize ? props.fontSize : ''};
    flex-direction: ${props => props.row ? 'row' : 'column'};
    justify-content: ${props => justifyContent(props)};
    align-items: ${props => props.alignItems ? props.alignItems : ""};
    padding: ${props => props.padding ? props.padding : "10px"};
    background: ${props => props.background ? props.background : "transparent"};
    font-size: ${props => props.fontSize ? props.fontSize : props.theme.fontSize.shmeazyNormal};
    position: ${props => props.position ? props.position : ""};
    left: ${props => props.left ? props.left : ""};
    right: ${props => props.right ? props.right : ""};
    z-index: ${props => props.zIndex ? props.zIndex : ''};
`;