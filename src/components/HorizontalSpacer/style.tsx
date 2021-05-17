import styled from "styled-components";

interface IProps {
    props: any;
}

const getWidth = (props: any) => {
    if(props.bigSpacer)
        return "50px";
    if(props.mediumSpacer)
        return "25px";
    if(props.smallSpacer) 
        return "10px";
}

export const StyledHorizontalSpacer = styled.div<IProps>`
    width: ${props => getWidth(props) ? getWidth(props) : "20px"};
`;