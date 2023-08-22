import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faBell, faHourglass1, faSnowman, faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import Logo from "../../../../Assets/Images/Logo2NoBackGroundWhite2.png";
import { authStore } from "../../../../Redux/AuthState";
import CredentialsModel from "../../../../Models/CredentialsModel";
import authService from "../../../../Services/AuthService";
import { useEffect, useState } from "react";

function Header(): JSX.Element {
    const navigate= useNavigate();
    const [user,setUser] = useState<CredentialsModel>()

    useEffect(()=>{
        setUser(authStore.getState().user);
        authStore.subscribe(()=> setUser(authStore.getState().user))
    },[])

    return (
        <header className="Header">
            <div className="Buttons">   
                {authService.isLoggedIn ?(<button className="logoutButton" onClick={()=>{authService.logout(); navigate("/signin") }}><FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon> <p>התנתק</p></button>):(<NavLink className="Auth_NavLink" to="/signin"> <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> <p>התחבר</p></NavLink>)}
                <NavLink className="Auth_NavLink" to="/notifactions"> <FontAwesomeIcon icon={faBell}></FontAwesomeIcon> <p>עדכונים</p></NavLink>
            </div>
            <div className="Logo">
                <img src={Logo} alt="" />
            </div>
        </header>
    );
}

export default Header;
