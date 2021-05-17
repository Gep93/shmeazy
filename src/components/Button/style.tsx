import styled from "styled-components";

interface Ibutton {
    color?: string,
    border?: string,
    padding?: string,
    width?: string,
    borderRadius?: string,
    cursor?: string,
    light?: boolean,
    // type?: string,
}

// export const StyledButton = styled.button<Ibutton>`
//     color: ${(props) => props.color ? props.color : "red"};
//     width: ${(props) => props.width ? props.width : '100%'};
//     border: ${(props) => props.border ? props.border : 'none'};
//     padding: ${(props) => props.padding ? props.border : '10px'};
//     border-radius: ${(props) => props.borderRadius ? props.borderRadius : '10px'};
//     background: ${(props) => props.background ? props.background : 'white'};
//     font-weight: ${(props) => props.fontWeight ? props.fontWeight : 'bold'};
//     cursor: ${(props) => props.cursor ? props.cursor : 'pointer'};
// `;

export const StyledButton = styled.button<Ibutton>`
    color: #c8c8c8;
    width: ${(props) => props.width ? props.width : '100%'};
    border: ${(props) => props.border ? props.border : 'none'};
    padding: 10px;
    margin: 0;
    border-radius: 10px;
    background: ${(props) => props.light ? 'white' : '#0D0E11'};
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
`;