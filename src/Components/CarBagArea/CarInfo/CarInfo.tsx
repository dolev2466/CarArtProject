import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CarInfo.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CarModel from "../../../Models/CarModel";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import carService from "../../../Services/CarBagService";
import Invitation from "../../../Models/InvitationModel";
import invitationService from "../../../Services/InvitattionService";
import { NavLink } from "react-router-dom";


function CarInfo(): JSX.Element {

    const [car,setCar] =useState<CarModel|null>(null);
    const [invitations,setInvitation] =useState<Invitation[]|null>(null);

    const params=useParams()

    useEffect(()=>{
        if(params.cnum!= undefined)
        {
        const carNumber=+params.cnum;
        carService.getCar(carNumber)
        .then( c => {console.log(c);setCar(c);})
        .catch(err=>console.log(err));
        }
    },[])

    useEffect(()=>{
        if(params.cnum!= undefined)
        {
        const carNumber=+params.cnum.toString();
        invitationService.getInvitationsByCarNumber(carNumber)
        .then( inv => {console.log(inv);setInvitation(inv);})
        .catch(err=>console.log(err));
        }
    },[])

    return (
        <div className="CarInfo">
            <div className="Right-side">
                <div className="info-div-car-info">
                    <div className="labels">
                        <label> סוג רכב :</label>
                        <label> פרטי</label>
                    </div>
                    <div className="labels">
                        <label> יצרן:</label>
                        <label> {car?.company}</label>
                    </div>
                    <div className="labels">
                        <label> דגם:</label>
                        <label> {car?.type}</label>
                    </div>
                    <div className="labels">
                        <label> שנת יצור:</label>
                        <label> {car?.year}</label>
                    </div>
                </div>
            </div>
            <div className="main">
                <h1>תיק רכב</h1>
                <h2>{"מספר רכב:"+ car?.carnumber}</h2>
                <NavLink className="carinfo-infoNavLink" to={"/newInvitation/"+params.cnum}>הזמנה חדשה <FontAwesomeIcon icon={faPlus} className="icons" /></NavLink>
                <h1>הזמנות קיימות</h1>
                <div className="Warper">
                <table>
                <thead>
                    <tr>
                        <th>מספר רכב</th>
                        <th>מספר הזמנה</th>
                        <th>עבודות שבוצעו</th>
                        <th>העובד המטפל</th>
                        <th>סטטוס</th>
                        <th>תאריך הזמנה</th>
                    </tr>
                </thead>
                <tbody>
                    {invitations && invitations.map(invite =>
                        <tr key = {invite._id}>
                            <td> {invite.carNumber}</td>
                            <td> {invite._id}</td>
                            <td> {invite.work.join(", ")} </td>
                            <td>{invite.worker}</td>
                            <td> {invite.status} </td>
                            <td>{invite.invitationDate}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
            </div>
        </div>
    );
}

export default CarInfo;
