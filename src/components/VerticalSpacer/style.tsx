import styled from "styled-components";

interface IProps {
    props: any;
}

const getHeight = (props: any) => {
    if(props.bigSpacer)
        return "50px";
    if(props.mediumSpacer)
        return "25px";
    if(props.smallSpacer) 
        return "10px";
}

export const StyledVerticalSpacer = styled.div<IProps>`
    height: ${props => getHeight(props) ? getHeight(props) : "20px"};
`;