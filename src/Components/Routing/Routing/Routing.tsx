import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import Home from "../../HomeArea/Home/Home/Home";
import CarsBagList from "../../CarBagArea/CarsBagList/CarsBagList";
import Login from "../../AuthArea/Login/Login";
import Signup from "../../AuthArea/Signup/Signup";
import CreateCarBag from "../../CarBagArea/CreateCarBag/CreateCarBag";
import StatusTable from "../../StatusArea/StatusTable/StatusTable";
import CarInfo from "../../CarBagArea/CarInfo/CarInfo";
import CreateInvitation from "../../InvitationArea/CreateInvitation/CreateInvitation";
import FinancicalReport from "../../ReportsArea/FinancicalReport/FinancicalReport";
import NotifactionPage from "../../NotifactionsArea/NotifactionPage/NotifactionPage";



function Routing(): JSX.Element {
    return (
        <Routes>
             <Route path="/home" element={<Home/>}></Route>
             <Route path="/car-info" element={<CarsBagList/>}></Route>
             <Route path="/signin" element={<Login/>}></Route>
             <Route path="/signup" element={<Signup/>}></Route>
             <Route path="/car-info/create-car-info" element={<CreateCarBag/>}></Route>
             <Route path="/car-info/car-bag/:cnum" element={<CarInfo/>}></Route>
             <Route path="/status" element={<StatusTable/>}></Route>
             <Route path="/newInvitation/:cnum" element={<CreateInvitation/>}></Route> 
             <Route path="/reports/financical-report" element={<FinancicalReport/>}></Route>        
             <Route path="/notifactions" element={<NotifactionPage/>}></Route>
             <Route path="/" element={<Navigate to="/signin"/>}></Route>     
        </Routes>
    );
}

export default Routing;
