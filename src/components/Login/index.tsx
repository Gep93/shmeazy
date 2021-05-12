import LoginRegisterForm from "../LoginRegisterForm/index";
import PlainButton from "../PlainButton/index";
import useToggleState from "../../hooks/useToggleState";
import LoginHeader from "./LoginHeader";
import TextCenterWrapper from "../TextCenterWrapper/index";
import MainContentWrapper from "../MainContentWrapper";

const Login = () => {
    const [login, toggleLogin] = useToggleState(true);
    const loginRegister = login ? "Free registration" : "Login";
    return (
        <MainContentWrapper>
            <TextCenterWrapper>
                <LoginHeader>Shmeazy</LoginHeader>
            </TextCenterWrapper>
            <TextCenterWrapper marginBottom="50px">
                <i style={{fontSize:"70px", color:"rgb(232, 23, 93, 1)"}} className="fas fa-shopping-basket"></i>
            </TextCenterWrapper>
            <LoginRegisterForm login={login} />
            <PlainButton onClick={toggleLogin}>{loginRegister}</PlainButton>
        </MainContentWrapper>
    );
}

export default Login;