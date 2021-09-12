import LoginRegisterForm from "../LoginRegisterForm/index";
import PlainButton from "../PlainButton/index";
import useToggleState from "../../hooks/useToggleState";
import LoginHeader from "./LoginHeader";
import TextCenterWrapper from "../TextCenterWrapper/index";
import MainContentWrapper from "../MainContentWrapper";
import { deleteJWT, localStorageHasJWT } from "../../helpers/localstorage";
import Button from "../Button";
import { useState } from "react";
import { useTheme } from "../../contexts/ThemeProvider";

const Login = () => {
    const {theme} = useTheme();
    const [login, toggleLogin] = useToggleState(true);
    const [loggedIn, setLoggedIn] = useState(localStorageHasJWT());
    const loginRegister = login ? "Free registration" : "Login";
    const logout = () => {
        deleteJWT();
        setLoggedIn(false);
    }
    
    return (
        <MainContentWrapper>
            <TextCenterWrapper>
                <LoginHeader>Shmeazy</LoginHeader>
            </TextCenterWrapper>
            <TextCenterWrapper marginBottom="50px">
                <i style={{fontSize:"70px", color:"rgb(232, 23, 93, 1)"}} className="fas fa-shopping-basket"></i>
            </TextCenterWrapper>
            {!loggedIn ? <>
            <LoginRegisterForm login={login} />
            <PlainButton onClick={toggleLogin}>{loginRegister}</PlainButton>
            </> :
            <Button border={theme.color.shmeazyWhite} onClick={logout}>Logout</Button>}
        </MainContentWrapper> 
    );
}

export default Login;