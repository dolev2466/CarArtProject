import "./Home.css";
import homeImage from "../../../../Assets/Images/Home_LogoNoBackGround.png"
import { NavLink } from "react-router-dom";
function Home(): JSX.Element {
    return (
        <div className="Home">
            <div className="headlines">
                <h1>ברוכים הבאים לאוטוארט</h1>
                <h3>בחר פעולה מתפריט הפעולות  </h3>
                <div className="links">
                <NavLink className="HomeInfoNavLink" to={"/car-info"}>חיפוש תיק רכב</NavLink>
                <NavLink className="HomeInfoNavLink" to={"/status"}>סטטוס רכב</NavLink>
                <NavLink className="HomeInfoNavLink" to={"/car-info/create-car-info"}>יצירת תיק רכב</NavLink>
                </div>
            </div>
            <img src={homeImage}></img>
        </div>
    );
}

export default Home;
