import { useState } from "react";
import { CustomButton } from "../UI/Button/Button"

type SignUpInProps = {
    signIn: (email:string, password:string) => void;
    signUp: (email:string, passwrod:string) => void;
}



export const SignUpIn = ({signIn, signUp,}: SignUpInProps) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    return(
        <div>
        <input type='text' placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)}/>
        <input type='password' placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)}/>
        <CustomButton label="Sign Up" hoverColor="green" onClick={() => signUp(email, password)}/>
        <CustomButton label="Sign in" hoverColor="green" onClick={() => signIn(email, password)}/>
        </div>
    )
}