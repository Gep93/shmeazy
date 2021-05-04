import { useState } from "react";
import useInputState from "../../hooks/useInputState";
import Joi from "joi";
import "./index.css";

const Login = () => {

    const [email, updateEmail, resetEmail] = useInputState("");
    const [password, updatePassword, resetPassword] = useInputState("");

    interface Ierrors {
        [key: string]: string;
    }
    const [errors, setErrors] = useState<Ierrors>({email: "", password:""});

    const schema = Joi.object({
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).label("Email"),
        password: Joi.string().min(6).max(10).required().label("Password"),
    });

    const isValid = (): boolean => {
        try {
            const {error} = schema.validate({email, password}, {abortEarly: false});
            if(!error) return true;

            let errs: Ierrors = {};
            error.details.forEach(el => {
                console.log(el.path, el.message);
                errs[el.path[0]] = el.message;
            });
            setErrors(errs);
        } catch(err) {
            console.log(err);
        }
        return false;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!isValid()) return;

        console.log(email, password);

        resetEmail();
        resetPassword();
        setErrors({email:"", password:""});
    }

    return (<div>
        <h1 className="LoginTitle">Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="email" value={email} onChange={updateEmail} autoFocus />
            <span className="LoginErrorMessage">{errors.email}</span>
            <input type="text" name="password" value={password} onChange={updatePassword} />
            <span className="LoginErrorMessage">{errors.password}</span>
            <button type="submit">Login</button>
        </form>
    </div>);
}

export default Login;