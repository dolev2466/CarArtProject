import { CarBagAction,CarsActionType } from "../Redux/CarBagState";
import { InvitationAction,InvitationActionType } from "../Redux/InvitationState";

export function AddCarClear(carStore:any)
{
    return function(next:Function){
        return function(action: CarBagAction)
        {
        if(action.type === CarsActionType.AddCar)
        {
        console.clear();
        console.log(`Current Action ${action.type}, ${action.payload}`);
        }
        next(action);
        }
    }
}

export function AddInvitationClear(invitationStore:any)
{
    return function(next:Function){
        return function(action: InvitationAction)
        {
        if(action.type === InvitationActionType.AddInvitation)
        {
        console.clear();
        console.log(`Current Action ${action.type}, ${action.payload}`);
        }
        next(action);
        }
    }
}