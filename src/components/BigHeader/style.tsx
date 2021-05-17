import { string } from "joi";
import styled from "styled-components";

interface IProps {
    pTop?: string,
}

export const StyledBigHeader = styled.h1<IProps>`
    color: rgb(232, 23, 93, 1);
    font-size:35px; 
    padding:50px 10px; 
    padding-top: ${props => props.pTop ? props.pTop : "50px"};
    /* padding:50px 20px 40px 20px; */
    /* text-align:center;  */
    text-align:left;
    margin: 0;
`;