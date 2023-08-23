import axios from "axios";
import appConfig from "../utils/AppConfig";
import Invitation from "../Models/InvitationModel";
import { InvitationStore,addInvitation } from "../Redux/InvitationState";

class InvitationService{
    public async getInvitationsByCarNumber(carNumber:number): Promise<Invitation[]>
    {
        let invitations = InvitationStore.getState().invitations.filter(inv=>inv.carNumber===carNumber);
            const response = await axios.get<Invitation[]>(appConfig.invitationCarUrl + carNumber);
            invitations = response.data;
        return invitations;
    }

    public async getAllInvitations():Promise<Invitation[]>
    {
        let invitations = InvitationStore.getState().invitations;
            const response = await axios.get<Invitation[]>(appConfig.invitationUrl);
            invitations = response.data;
        return invitations;
    }

    public async addInvitationToDB(invitation:Invitation):Promise<void>
    {
      const headers={"Content-Type": "application/json"}
      const response = await axios.post<Invitation>(appConfig.invitationUrl,invitation,{headers});
      const addedInvitation = response.data;
      InvitationStore.dispatch(addInvitation(addedInvitation))
    }

}

const invitationService = new InvitationService();

export default invitationService;