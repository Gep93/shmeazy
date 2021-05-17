import { StyledFont } from "./style";

const Font = ({children, ...rest}:{children: string | JSX.Element | JSX.Element[], fontSize?: string}) => {
    return(
        <StyledFont {...rest}>{children}</StyledFont>
    );
}

export default Font;