import LoginRegisterForm from "../LoginRegisterForm/index";
import "./index.css";
import PlainButton from "../PlainButton/index";
import useToggleState from "../../hooks/useToggleState";

const Login = () => {
    const [login, toggleLogin] = useToggleState(true);
    const loginRegister = login ? "Free registration" : "Login";
    return (
        <div>
            <div className="LoginFormWrapper">
                <h1 className="LoginTitle">Login</h1>
                <LoginRegisterForm login={login} />
                <div>
                    <PlainButton onClick={toggleLogin}>{loginRegister}</PlainButton>
                </div>
            </div>
        </div>
    );
}

export default Login;