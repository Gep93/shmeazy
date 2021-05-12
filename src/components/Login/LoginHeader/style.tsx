import styled from "styled-components";

export const StyledH1 = styled.h1`
    font-size: 60px;
    text-align: center;
    color: rgb(232, 23, 93, 1);
    display: inline;
    position: relative;

    &::after{
        content:'Shopping made easy';
        position: absolute;
        left:0;
        top:100%;
        color: rgb(232, 23, 93, 1);
        font-size: 20px;
    }
`;