import {StyledBigHeader, StyledBigHeaderEditable} from "./style";

const BigHeader = ({children, ...rest}:{children: string | null | JSX.Element, pTop?: string}) => {
    return(
        <StyledBigHeader {...rest}>{children}</StyledBigHeader>
    )
}

export default BigHeader;