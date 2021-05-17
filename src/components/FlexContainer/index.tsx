import Font from "../Font";
import { StyledFlexContainer } from "./style";

interface IFlexContainer {
    children: HTMLCollection | JSX.Element | JSX.Element[] | null,
    row?: boolean | undefined,
}

const FlexContainer = ({children, ...rest}: IFlexContainer & {[key:string]: string | boolean | JSX.Element | JSX.Element[]}) => {
    return(
        <Font>
            <StyledFlexContainer {...rest}>{children}</StyledFlexContainer>
        </Font>
    );
}

export default FlexContainer;