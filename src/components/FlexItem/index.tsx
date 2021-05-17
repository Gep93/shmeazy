import { StyledFlexItem } from "./style";

const FlexItem = ({children, ...rest}: {children:string | JSX.Element | JSX.Element[], [key: string]: any}) => {
    return(
        <StyledFlexItem {...rest}>{children}</StyledFlexItem>
    );
}

export default FlexItem;