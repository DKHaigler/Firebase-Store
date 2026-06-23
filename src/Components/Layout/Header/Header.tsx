import { User } from "firebase/auth";
import { useState } from "react";
import { CustomButton } from "../../UI/Button/Button";
import { useAuth } from "../../../features/auth/context/AuthContext";
import { TeamSwitcher } from "../../UI/TeamSwitcher/TeamSwitcher";
import "./Header.css"
import { NavLink } from "react-router-dom";


type HeaderProps = {
    user:User | null
}
export const Header =({user}: HeaderProps) => {
      const [menuOpen, setMenuOpen] = useState(false);
       const {logOut} = useAuth()


    return(
        <header className="header">
            <TeamSwitcher user={user}/>
        <button className="hamburger" onClick={() => setMenuOpen(prev => !prev)}>
          ☰
        </button>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Home
          </NavLink>

          <NavLink to="/tasks" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            My Tasks
          </NavLink>

          <NavLink to="/inbox" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Inbox
          </NavLink>
          <div className="account-menu">
            <p>Logged in as: {user?.email} </p>
            <CustomButton label="Sign Out" hoverColor="red" onClick={logOut}/>
          </div>
        </nav>
        </header>
    );
}
