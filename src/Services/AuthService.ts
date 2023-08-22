import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import { authStore, loginAction, logoutAction } from "../Redux/AuthState";
import appConfig from "../utils/AppConfig";


class AuthService{

    

    public async login(credential:CredentialsModel):Promise<void>
    {
        const response = await axios.post<string>(appConfig.loginUrl,credential);
        const token = response.data;
        authStore.dispatch(loginAction(token));
    }

    public logout():void
    {
        authStore.dispatch(logoutAction());
    }

    public get isLoggedIn():boolean
    {
        return authStore.getState().token!== null;
    }
}

const authService = new AuthService();

export default authService;