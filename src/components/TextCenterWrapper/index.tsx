import {StyledTextCenterWrapper} from "./style";
// interface ITextWrapper {
//     // props?: {override: {marginBottom: string}}
//     override?: {marginBottom?: string} | undefined,
//     marginBottom?: string
//     // children: JSX.Element | string;
// }
const TextCenterWrapper = ({children, marginBottom} : {children: JSX.Element | string, marginBottom?: string}) => {
    return(
        <StyledTextCenterWrapper marginBottom={marginBottom}>{children}</StyledTextCenterWrapper>
    );
}

export default TextCenterWrapper;