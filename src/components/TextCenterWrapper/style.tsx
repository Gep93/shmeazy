import styled from "styled-components";

interface ITextWrapper {
    // props?: {override: {marginBottom: string}}
    // override?: {marginBottom?: string},
    // children: JSX.Element | string;
    marginBottom?: string
}

export const StyledTextCenterWrapper = styled.div< ITextWrapper>`
    text-align: center;
   
    margin-bottom: ${(props) => props.marginBottom ? props.marginBottom : "0px"}
`;