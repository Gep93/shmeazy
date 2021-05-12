import {StyledH1} from "./style";

const LoginHeader = ({children}: {children: string}) => {
    return(
        <div style={{padding: '50px 0'}}>
            <div style={{position: 'relative'}}>
                <StyledH1>{children}</StyledH1>
            </div>
        </div>
    );
}

export default LoginHeader;