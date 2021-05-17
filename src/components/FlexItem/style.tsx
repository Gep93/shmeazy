import styled from "styled-components";

const alignSelf = (props: any) => {
    if(props.alignEnd)
        return "flex-end";
    if(props.alignStart)
        return "flex-start";
}

export const StyledFlexItem = styled.div`
    align-self: ${props => alignSelf(props) ? alignSelf(props) : ""};
`;