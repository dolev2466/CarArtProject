import CarModel from "../../../Models/CarModel";
import "./CarCard.css";
import tempImage from "../../../Assets/Images/toyota-yaris.png"
import { NavLink } from "react-router-dom";

interface CarCardProps {
    car:CarModel
}

function CarCard(props: CarCardProps): JSX.Element {
    return (
        <div className="CarCard">
			<div className="img-div">
                {props.car.image?(<img src={"http://localhost:8080/"+props.car.image.toString()}></img>):(<img src="{tempImage}"></img>)}
            </div>
            <div className="info-div">
                <label> מספר רכב: {props.car.carnumber}</label>
                <label> חברת רכב: {props.car.company}</label>
                <label> סוג רכב: {props.car.type}</label>
                <label> שנת יצור: {props.car.year}</label>
                <NavLink className="infoNavLink" to={"/car-info/car-bag/"+props.car.carnumber}>תיק רכב</NavLink>     
            </div>
        </div>
    );
}

export default CarCard;
