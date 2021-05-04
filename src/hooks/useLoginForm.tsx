import {useState} from "react";
import Joi, { isSchema } from "joi";

export default () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const validateInput = (value: string) => {
        // schema.validate(value, schema[v])
    }

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(40)
    });
}