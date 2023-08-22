import { useEffect, useRef, useState } from "react";
import "./CreateInvitation.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faBell, faDeleteLeft, faRemove, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from "react-router-dom";
import {} from 'react-router-dom';
import Invitation from "../../../Models/InvitationModel";
import carService from "../../../Services/CarBagService";
import CarModel from "../../../Models/CarModel";
import invitationService from "../../../Services/InvitattionService";
import ImageUploader from "../../CarBagArea/imageUploader/imageUploader";
import InvitaionImageUploader from "../InvitaionImageUploader/InvitaionImageUploader";

function CreateInvitation(): JSX.Element {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [listItems, setListItems] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [tempValue, setTempValue] = useState<string>('');
    const [worker, setWorker] = useState<string>('');
    const [car, setCar] = useState<CarModel>();
    const currentDate = new Date(Date.now());
    const formattedDate = currentDate.toISOString().split('T')[0];
    const navigate=useNavigate();

    const params=useParams();

    useEffect(()=>{
        if(params.cnum)
        {
            carService.getCar(parseInt(params.cnum)).then
            (ca=>setCar(ca)).catch(err=>console.log(err))
        }
    },[])
    const handleAddItem = () => {
        if (inputValue.trim() !== '') {
          setListItems([...listItems, inputValue]);
          setWorker(tempValue);
          setInputValue('');
          setTempValue('');
          if(inputRef.current!=null && inputRef.current.value)
          inputRef.current.value = '';
        }
      };

      const handleDeleteItem = (index: number) => {
        const updatedList = listItems.filter((_, i) => i !== index);
        setListItems(updatedList);
      };

      const AddInvitation=async ()=>{
        let newInvitation= new Invitation();
        if(params.cnum) newInvitation.carNumber=parseInt(params.cnum);     
        if(car?.company) newInvitation.company = car?.company;
        newInvitation.days = 5;
        newInvitation.invitationDate=formattedDate;
        newInvitation.price= 500;
        newInvitation.status="בעבודה";
        newInvitation.work=listItems;
        newInvitation.worker=worker;
        await invitationService.addInvitationToDB(newInvitation);
        navigate(`/status`);
        navigate(`/car-info/car-bag/${car?.carnumber}`);
      }

    
    return (
        <div className="CreateInvitation">
			<div className="RightDiv">
                <div className="InfoDiv">
                    <div className="props">
                        <label>תאריך:</label>
                        <label>{formattedDate}</label>
                    </div>
                    <div className="props">
                        <label>מספר ימים במוסך:</label>
                        <label>0</label>
                    </div>
                </div>
                <div className="InvitationMenuWarpper">
                    <div className="InvitationMenu">
                        <button className="topButton">שיבוץ עובדים</button>
                        <button>בקשת תוספת</button>
                        <button>ריגקט</button>
                        <button className="underButton">גלריית תמונות</button>
                    </div>
                </div>
            </div>
            <div className="LeftDiv">
                <h1>יצירת הזמנה</h1>
                <h2>{"מספר רכב:" + car?.carnumber}</h2>
                <div className="AddJobDiv">
                    <label>עבודות:</label>
                    <input
                     type="text"
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     ></input>
                    <label>עובד:</label>
                    <input type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    ></input>
            </div>
            <div className="AddJobDiv">
                    <label>חלקים:</label>
                    <input
                     id="parts"
                     type="text"
                     ref={inputRef}
                     ></input>
                     <InvitaionImageUploader></InvitaionImageUploader>
            </div>
            <button onClick={handleAddItem}>הוספה</button>
                <div className="TableDiv">
                    <ul className="work-ul">
                        {listItems.map((item, index) => (
                        <li className="work-li" key={index}>{item}
                        <button onClick={() => handleDeleteItem(index)}><FontAwesomeIcon icon={faTrashCan} className="li-icon"></FontAwesomeIcon></button>
                        </li>
                        ))}
                    </ul>
                </div>
                <button onClick={() => AddInvitation()} >יצירת הזמנה</button>
            </div>
        </div>
    );
}

export default CreateInvitation;
