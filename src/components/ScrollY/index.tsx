import { StyledScrollY } from "./style";

const ScrollY = ({children}:{children: string | JSX.Element | JSX.Element[] | null}) => {
    return(
        <StyledScrollY>{children}</StyledScrollY>
    );
}

export default ScrollY;