import CredentialsModel from "../../../Models/CredentialsModel";
import { useForm } from "react-hook-form";
import "./Signup.css";
import { NavLink } from "react-router-dom";

function Signup(): JSX.Element {

    const {register,handleSubmit,formState} = useForm<CredentialsModel>();
    async function send(credentials:CredentialsModel)
    {
       console.log(credentials);
    }

    return (
        <div className="Signup">
			<div className="SignupBox">
                <div className="signup-Imag-div">
                    <h1>ברוכים הבאים</h1>
                    <h2>בבקשה הכנס את הפרטים שלך כדי ליצור משתמש</h2>
                    <h3>או לחץ כאן להתחברות</h3>
                    <NavLink className="Imag-div-NavLink" to="/signin"> <p>להתחברות</p></NavLink>
                </div>
                <div className="SignupForm">
                    <h1>הרשמה</h1>    
                    <form className="signup-form-div" onSubmit={handleSubmit(send)}>
                        <div className="prop-div">
                            <span>{formState.errors.username?.message}</span>
                            <input type="text" {...register("username",CredentialsModel.userNameValidation)}></input>
                            <label>:שם משתמש</label>
                        </div>
                        <div className="prop-div">
                            <span>{formState.errors.password?.message}</span>
                            <input type="password" {...register("password",CredentialsModel.passwordValidation)}></input>
                            <label>:סיסמא</label>
                        </div>
                        <div className="prop-div">
                            <span>{formState.errors.username?.message}</span>
                            <input type="text" {...register("username",CredentialsModel.userNameValidation)}></input>
                            <label>:שם</label>
                        </div>
                        <div className="prop-div">
                            <span>{formState.errors.username?.message}</span>
                            <input type="text" {...register("username",CredentialsModel.userNameValidation)}></input>
                            <label>:שם משפחה</label>
                        </div>
                        <button>הרשם</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
