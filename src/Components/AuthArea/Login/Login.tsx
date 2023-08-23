import "./Login.css";
import { useForm } from "react-hook-form";
import img from "../../../Assets/Images/LoginImage.jpg";
import CredentialsModel from "../../../Models/CredentialsModel";
import { NavLink,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the default CSS
function Login(): JSX.Element {
    const {register,handleSubmit,formState} = useForm<CredentialsModel>();
    const navigate =useNavigate();
    async function send(credentials:CredentialsModel)
    {
        try{
            await authService.login(credentials)
            toast.success('ברוכים השבים', {
                position: 'top-right',
                autoClose: 3000, // Time in milliseconds
              });
              navigate("/home");
              
        }catch(err:any){
            toast.error('שם משתמש או סיסמא לא נכונים', {
                position: 'top-right',
                autoClose: 3000, // Time in milliseconds
              });
        }
    }

    return (
        <div className="Login">
             <ToastContainer /> {/* Required for displaying notifications */}
                <div className="LoginForm">
                    <h1>התחברות</h1>    
                    <form className="form-div" onSubmit={handleSubmit(send)}>
                        <div className="prop-div">

                            <label>שם משתמש:</label>
                            <input type="text" {...register("username",CredentialsModel.userNameValidation)}></input>
                            <span>{formState.errors.username?.message}</span>

                        </div>
                        <div className="prop-div">
                            <label>סיסמא:</label>
                            <input type="password" {...register("password",CredentialsModel.passwordValidation)}></input>
                            <span>{formState.errors.password?.message}</span>

                        </div>
                        <button>התחבר</button>
                    </form>
                </div>
            </div>
    );
}

export default Login;
