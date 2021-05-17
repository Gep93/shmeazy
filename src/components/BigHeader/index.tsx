import {StyledBigHeader} from "./style";

const BigHeader = ({children, ...rest}:{children: string, pTop: string}) => {
    return(
        <StyledBigHeader {...rest}>{children}</StyledBigHeader>
    )
}

export default BigHeader;