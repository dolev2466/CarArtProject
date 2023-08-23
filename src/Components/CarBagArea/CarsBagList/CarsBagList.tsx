import CarModel from "../../../Models/CarModel";
import CarCard from "../CarCard/CarCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import "./CarsBagList.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import CarBagService from "../../../Services/CarBagService";

function CarsBagList(): JSX.Element {

    const [cars,setCars] =useState<CarModel[]>([]);

        CarBagService.getAllCars()
        .then( cars => {setCars(cars);})
        .catch(err=>console.log(err));

    return (
        <div>
             <NavLink className="CarBagAddButton" to="/car-info/create-car-info"><FontAwesomeIcon icon={faPlusCircle} className="iconss"/></NavLink>
            <div className="CarsBagFilter">
                <label>סנן לפי מספר רכב:</label>
                <input></input>
            </div>
            <div className="CarsBagList">
            { cars.map( car=> <CarCard key={car.carnumber} car={car}/>)}
            </div>
        </div>
        
    );
}

export default CarsBagList;
