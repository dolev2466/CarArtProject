
import { useEffect, useState } from "react";
import "./StatusTable.css";
import Invitation from "../../../Models/InvitationModel";
import invitationService from "../../../Services/InvitattionService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function StatusTable(): JSX.Element {

    const [startDate, setStartDate] = useState<Date|null>(new Date());
    const [endDate, setEndDate] = useState<Date|null>(new Date());
    const [invitations,setInvitation] =useState<Invitation[]>([]);
    
        invitationService.getAllInvitations()
        .then( inv => {setInvitation(inv);})
        .catch(err=>console.log(err));


    return (
        <div className="StatusTable">
              <h1 className="Filter-div-headline">סטטוס רכב</h1>
              <div className="Warper">
                <div className="StatusFilterDiv">
                            <label>תאריך התחלה:</label>
                            <DatePicker className="StatusDatePicker" dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => setStartDate(date)} />
                            <label>תאריך סיום:</label>
                            <DatePicker className="StatusDatePicker" dateFormat="dd/MM/yyyy" selected={endDate} onChange={(date) => setEndDate(date)} />
                            <button>סנן</button>
                        </div>
                <table>
                    <thead>
                        <tr>
                            <th>תאריך פתיחת תיק</th>
                            <th>מספר רכב</th>
                            <th>יצרן</th>
                            <th>עבודות שבוצעו</th>
                            <th>סטאטוס</th>
                            <th>ימים במוסך</th>
                            <th>מחיר</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invitations && invitations.map(invite =>
                            <tr key = {invite._id}>
                                <td> {invite.invitationDate}</td>
                                <td> {invite.carNumber}</td>
                                <td> {invite.company} </td>
                                <td> {invite.work.join(", ") } </td>
                                <td> {invite.status} </td>
                                <td> {invite.days} </td>
                                <td> {invite.price} </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StatusTable;
