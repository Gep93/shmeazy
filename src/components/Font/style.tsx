import styled from "styled-components";

interface IProps {
    fontSize?: string
}

const getFont = (fontSize: string) => {
    if(fontSize==="ShmeazyBig")
        return "40px";
    if(fontSize==="ShmeazyMedium")
        return "25px";
    if(fontSize==="ShmeazySmall")
        return "10px";
} 

export const StyledFont = styled.div<IProps>`
    color: #c8c8c8;
    font-size: ${props => props.fontSize ? getFont(props.fontSize) : "20px"};
    /* width:100%; */
    //font-family: props from config
    //color: props from config
`;