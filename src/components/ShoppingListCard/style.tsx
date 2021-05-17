import styled from "styled-components";

const getBackground = (props: any) => {
    if(props.shmeazyBlack) 
        return "#0B0E11";
    if(props.shmeazyLightBlack)
        return "#15171F";
}

export const StyledShoppingListCard = styled.div`
    padding: 20px 20px 20px 20px;
    background: ${props => getBackground(props) ? getBackground(props) : "transparent"}; //hook || context
`;