import { useEffect, useState } from "react";
import "./FinancicalReport.css";
import Invitation from "../../../Models/InvitationModel";
import invitationService from "../../../Services/InvitattionService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function FinancicalReport(): JSX.Element {

    const [startDate, setStartDate] = useState<Date|null>(new Date());
    const [endDate, setEndDate] = useState<Date|null>(new Date());
    const [invitations,setInvitation] =useState<Invitation[]|null>(null);
    
        invitationService.getAllInvitations()
        .then( inv => {setInvitation(inv);})
        .catch(err=>console.log(err));


    return (
        <div className="FinancicalReport">
                <h1>דוח חשבוניות</h1>
                <div className="warper">
                    <div className="FinancicalFilterDiv">
                        <label>תאריך התחלה:</label>
                        <DatePicker className="FinancicalDatePicker" dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => setStartDate(date)} />
                        <label>תאריך סיום:</label>
                        <DatePicker className="FinancicalDatePicker" dateFormat="dd/MM/yyyy" selected={endDate} onChange={(date) => setEndDate(date)} />
                        <button>סנן</button>
                    </div>
                <div className="FinancicalTable">
                <table>
                    <thead>
                        <tr>
                            <th>תאריך פתיחת תיק</th>
                            <th>מספר רכב</th>
                            <th>עבודות שבוצעו</th>
                            <th>מחיר</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invitations && invitations.map(invite =>
                            <tr key = {invite._id}>
                                <td> {invite.invitationDate}</td>
                                <td> {invite.carNumber}</td>
                                <td> {invite.work.join(", ")} </td>
                                <td> {invite.price} </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
}

export default FinancicalReport;
