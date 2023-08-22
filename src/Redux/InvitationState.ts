import {applyMiddleware, createStore } from "redux";
import Invitation from "../Models/InvitationModel";
import { AddInvitationClear } from "../Services/Middleware";

export class InvitationState {
    public invitations: Invitation[] = [];
}

export enum InvitationActionType {
    FetchInvitations = "FetchInvitations",
    AddInvitation = "AddInvitation",
    UpdateInvitation = "UpdateInvitation"
}

export interface InvitationAction {
    type: InvitationActionType;
    payload: any
}

export function fetchInvitations(invitations: Invitation[]): InvitationAction {
    return { type: InvitationActionType.FetchInvitations, payload: invitations }
}

export function addInvitation(invitation: Invitation): InvitationAction {
    return { type: InvitationActionType.AddInvitation, payload: invitation }
}

export function updateInvitation(invitation: Invitation): InvitationAction {
    return { type: InvitationActionType.UpdateInvitation, payload: invitation }
}


export function invitationReducer(currentState: InvitationState = new InvitationState(), action: InvitationAction): InvitationState {
    let newState: InvitationState = { ...currentState }

    switch (action.type) {
        case InvitationActionType.FetchInvitations:
            newState.invitations = action.payload;
            break;

        case InvitationActionType.AddInvitation:
            newState.invitations.push(action.payload)
            break;
        case InvitationActionType.UpdateInvitation:
            const indexToUpdate = newState.invitations.findIndex(inv => inv._id == action.payload.id)
            if (indexToUpdate >= 0) newState.invitations[indexToUpdate] = action.payload;
            break;
    }
    return newState
}

export const InvitationStore = createStore(
    invitationReducer, applyMiddleware(AddInvitationClear)
    );