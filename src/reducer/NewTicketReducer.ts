import {TicketPayload} from "../gen-backend-api/api";
import NewTicketViewState from "../model/NewTicketViewState";

export enum NewTicketActionEnum {
    CHANGE_REASON,
    CHANGE_EMPLOYER_CODE,
    CHANGE_START_ADDRESS,
    CHANGE_FINISH_ADDRESS,
    CHANGE_START_TIME,
    CHANGE_DURATION
}


export type  NewTicketAction = {
    action: NewTicketActionEnum,
    payload: any
};

export const NewTicketReducer = (state: TicketPayload, {action, payload}: NewTicketAction): NewTicketViewState => {
    const newState = {...state} as NewTicketViewState;

    switch (action) {
        case NewTicketActionEnum.CHANGE_REASON:

            break;
    }

    return newState;
}