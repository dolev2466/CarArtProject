import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCommentDots} from '@fortawesome/free-regular-svg-icons'
import {faBusinessTime,faAt} from '@fortawesome/free-solid-svg-icons'
import "./NotifactionPage.css";


function NotifactionPage(): JSX.Element {
    return (
        <div className="NotifactionPage">
            <h1>התראות:</h1>
            <div className="NotifactionContainer">
                <FontAwesomeIcon icon={faCommentDots} className='NotifactionIcons'  />
                <label>בקשה לאישור תוספת ממתינה בתיק רכב מספר: 355-82-002</label>
            </div>
            <div className="NotifactionContainer">
                <FontAwesomeIcon icon={faBusinessTime} className='NotifactionIcons'  />
                <label>נשלחה בקשה לתוספת הזמנה</label>
            </div>
            <div className="NotifactionContainer">
            <FontAwesomeIcon icon={faAt} className='NotifactionIcons'  />
            <label>עובד יאיר שובץ להזמנה מספר #1234</label>
            </div>
        </div>
    );
}

export default NotifactionPage;
