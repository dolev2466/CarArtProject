import UserModel from "../Models/CredentialsModel";
import jwtDecode from "jwt-decode";
import { createStore } from "redux";

export class AuthState {
     token=null;
     user=null;

     constructor(){
        this.token=localStorage.getItem("token");
        console.log(this.token);
        if(this.token)
        {
            this.user=jwtDecode<{user:UserModel}>(this.token).user;
        }
        
    }
}
export function loginAction(token) {
    return { type: "Login", payload: token }
}

export function logoutAction() {
    return { type: "Logout" }
}

export function authReducer(currentState = new AuthState(), action) {
    const newState = { ...currentState }

    switch (action.type) {
        case "Login":
            newState.token=action.payload;
            newState.user=jwtDecode<{user:UserModel}>(action.payload).user;
            localStorage.setItem("token",action.payload);
            break;
        case "Logout":
            newState.user=null;
            newState.token=null;
            localStorage.removeItem("token");
            break;
    }
    return newState
}

export const authStore = createStore(authReducer);