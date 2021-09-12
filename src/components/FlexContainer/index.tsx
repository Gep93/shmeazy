import { useTheme } from "../../contexts/ThemeProvider";
import Font from "../Font";
import { StyledFlexContainer } from "./style";

interface IFlexContainer {
    children: HTMLCollection | JSX.Element | JSX.Element[] | null,
    row?: boolean | undefined,
}

const FlexContainer = ({children, id, ...rest}: IFlexContainer & {[key:string]: string | number | boolean | JSX.Element | JSX.Element[] | (() => void)}) => {
    const {theme} = useTheme();

    return(
        <StyledFlexContainer id={id} theme={theme} {...rest}>{children}</StyledFlexContainer>
    );
}

export default FlexContainer;