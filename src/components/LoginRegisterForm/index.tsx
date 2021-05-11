import {useState, useEffect} from "react";
import useToggleState from "../../hooks/useToggleState";
import { FormEvent } from "react";
import Joi, { string } from "joi";
import authenticateUser, {createNewUser} from "../../services/httpServices";
import "../LoginRegisterForm/index.css";
import Button from "../Button";

interface Idata {
    username?: string,
    email: string,
    password: string
}

interface Ierrors {
    [key: string]: string
}

interface Ischema {
    [key: string]: Joi.StringSchema | Joi.AnySchema,
}

const LoginRegisterForm = ({login}: {login: boolean}) => {
    const loginFields = {email:"", password:""};
    const registerFields = {username: "", ...loginFields};
    // const initialInputVals: any = login ? loginFields : registerFields;
    const initialInputVals: any = registerFields;

    const [inputValues, setInputValue] = useState<Idata>(initialInputVals);
    const [errors, setErrors] = useState<Ierrors>(initialInputVals);
    const [showPassword, togglePassword] = useToggleState(false);

    useEffect(() => {
        setInputValue(initialInputVals);
        setErrors(initialInputVals);
    }, [login])

    let schema: Ischema = {
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().label("Email"),
        password: Joi.string().min(6).max(20).required().label("Password"),
    }
    if(!login) schema = {...schema, username: Joi.string().alphanum().min(3).max(20).required()};

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setInputValue({...inputValues, [name]: value});
        validateInput(name, value);
    };

    const validateInput = (name: string, value: string) => {
        const testSchema = Joi.object({[name]: schema[name]});
        const {error} = testSchema.validate({[name]:value});
        if(!error) return setErrors({...errors, [name]: ""});
        
        let errs:Ierrors = {...errors};
        error.details.forEach((err)=> {
            errs[err.path[0]] = err.message;
        });
        setErrors(errs);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(!validate()) return;
        if(login) {
            const jwt = await authenticateUser(inputValues);
            localStorage.setItem("jwt", jwt);
            return;
        } 
        createNewUser(inputValues);
    }

    const validate = (): boolean => {
        let value: Idata = {...inputValues};
        if(login) value = {email: inputValues.email, password: inputValues.password}
        
        const {error} = Joi.object(schema).validate(value, {abortEarly: false});
        if(!error) return true;
        console.log(error);
        let errs:Ierrors = {};
        error.details.forEach((err)=> {
            errs[err.path[0]] = err.message;
        });
        setErrors(errs);
        return false;
    }

    return(
        <form onSubmit={handleSubmit} className="input-icons" style={{position:"relative"}}>
            {!login && <div className="LoginFormSection">
                <label htmlFor="username" className="LoginLabel">Username:</label>
                <input autoFocus id="username" className="LoginInput" name="username" type="text" value={inputValues.username} onChange={handleChange} />
                <span className="LoginErrorMessage">{errors.username}</span>
            </div>}
            <div className="LoginFormSection">
                <label htmlFor="email" className="LoginLabel">Email:</label>
                <input autoFocus={login} id="email" className="LoginInput" name="email" type="text" value={inputValues.email} onChange={handleChange} />
                <span className="LoginErrorMessage">{errors.email}</span>
            </div>
            <div className="LoginFormSection">
                <label htmlFor="password" className="LoginLabel">Password:</label>
                <div>
                    <i onClick={togglePassword} className={`LoginFormIcon fa fa-eye${showPassword ? "" : "-slash"} `}></i>
                    <input id="password" className="LoginInput" name="password" type={showPassword ? "text" : "password"} value={inputValues.password} onChange={handleChange} />
                </div>
                <span className="LoginErrorMessage">{errors.password}</span>
            </div>
            <Button type="submit">{login ? "Login" : "Create Account"}</Button>
        </form>
    );
}

export default LoginRegisterForm;