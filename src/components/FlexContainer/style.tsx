import styled from "styled-components";

interface IFlexContainer {
    height?: string,
    row?: boolean | undefined,
    [key: string]: any
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

const getBackground = (props: any) => {
    if(props.shmeazyBlack) 
        return "#0B0E11";
    if(props.shmeazyLightBlack)
        return "#15171F";
}

export const StyledFlexContainer = styled.div<IFlexContainer>`
    height: ${props => props.height ? props.height : '100vh'};
    display: flex;
    flex-direction: ${props => props.row ? 'row' : 'column'};
    justify-content: ${props => justifyContent(props)};
    padding: ${props => props.padding ? props.padding : "10px"};
    background: ${props => getBackground(props) ? getBackground(props) : "transparent"};
`;