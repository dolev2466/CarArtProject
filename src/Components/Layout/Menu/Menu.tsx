import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse,faSuitcase,faBullseye,faBook} from '@fortawesome/free-solid-svg-icons'
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu-div">
             <div className="Menu">
                <NavLink className="NavLink" to="/home"> <FontAwesomeIcon icon={faHouse} className="icons" /> <p>בית</p></NavLink>
                <NavLink className="NavLink" to="/car-info"> <FontAwesomeIcon icon={faSuitcase} className="icons" /> <p>תיק רכב</p></NavLink>
                <NavLink className="NavLink" to="/status"> <FontAwesomeIcon icon={faBullseye} className="icons" /> <p>סטטוס רכב</p></NavLink>
                <NavLink className="NavLink" to="/reports/financical-report"> <FontAwesomeIcon icon={faBook} className="icons" /> <p>דוחות</p></NavLink>
            </div>
        </div>
    );
}

export default Menu;
