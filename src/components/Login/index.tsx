import LoginRegisterForm from "../LoginRegisterForm/index";
import "./index.css";
import Button from "../Button";
import useToggleState from "../../hooks/useToggleState";

const styles = {width:"auto", background:"transparent", color: "rgb(232, 23, 93, 1)"};
const Login = () => {
    const [login, toggleLogin] = useToggleState(true);
    const loginRegister = login ? "Free registration" : "Login";
    return (
        <div>
            <div className="LoginFormWrapper">
                <h1 className="LoginTitle">Login</h1>
                <LoginRegisterForm login={login} />
                <div>
                    <Button onClick={toggleLogin} style={styles}>{loginRegister}</Button>
                </div>
            </div>
        </div>
    );
}

export default Login;