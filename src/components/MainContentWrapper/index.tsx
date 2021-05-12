import {StyledMainContentWrapper} from "./style";

const MainContentWrapper = ({children}:{children: JSX.Element | JSX.Element[] | string}) => {
    return(
       <StyledMainContentWrapper>{children}</StyledMainContentWrapper> 
    );
}

export default MainContentWrapper;