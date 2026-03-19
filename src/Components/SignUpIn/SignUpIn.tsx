import { CustomButton } from "../Button/Button"

type SignUpInProps = {
    signIn: () => void;
    signUp: () => void;
    email: string;
    password: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export const SignUpIn = ({signIn, signUp, setEmail, setPassword, email, password}: SignUpInProps) => {
    return(
        <div>
        <input type='text' placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)}/>
        <input type='password' placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)}/>
        <CustomButton label="Sign Up" hoverColor="green" onClick={signUp}/>
        <CustomButton label="Sign in" hoverColor="green" onClick={signIn}/>
        </div>
    )
}