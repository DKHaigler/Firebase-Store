import { useState } from "react";
import { CustomButton } from "../Button/Button";
import './SignUpIn.css'

type SignUpInProps = {
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string, name: string) => void;
};

export const SignUpIn = ({ signIn, signUp }: SignUpInProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  return (
    <div>
      <div className="auth-inputs">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="auth-buttons">
      <CustomButton
        label="Sign Up"
        hoverColor="green"
        onClick={() => signUp(email, password, name)}
      />
      <CustomButton
        label="Sign in"
        hoverColor="green"
        onClick={() => signIn(email, password)}
      />
      </div>
    </div>
  );
};