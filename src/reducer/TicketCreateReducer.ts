import {Address, TicketPayload, WorkTicketPayload} from "../gen-backend-api/api";
import TicketCreateVM from "../model/TicketCreateVM";
import moment from "moment";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";

enum TicketCreateActionType {
    CHANGE_REASON,
    CHANGE_EMPLOYER_CODE,
    CHANGE_START_POSITION,
    CHANGE_FINISH_POSITION,
    CHANGE_LEAVE_TIME,
    CHANGE_DURATION
}

type TicketCreateAction<T> = {
    type: TicketCreateActionType,
    payload: T
}

const TicketCreationActionBuilder = {
    changeReason: (reason: string): TicketCreateAction<string> => {
        return {
            type: TicketCreateActionType.CHANGE_REASON,
            payload: reason
        }
    },
    changeEmployerCode: (employerCode: string): TicketCreateAction<string> => {
        return {
            type: TicketCreateActionType.CHANGE_EMPLOYER_CODE,
            payload: employerCode
        }
    },
    changeTime: (leaveTime: MaterialUiPickersDate): TicketCreateAction<MaterialUiPickersDate> => {
        return {
            type: TicketCreateActionType.CHANGE_LEAVE_TIME,
            payload: leaveTime
        }
    },
    changePosition: (type: TicketCreateActionType.CHANGE_START_POSITION | TicketCreateActionType.CHANGE_FINISH_POSITION, payload: string): TicketCreateAction<string> => {
        return {
            type: type,
            payload: payload
        }
    },
    changeDuration: (duration: number): TicketCreateAction<number> => {
        return {
            type: TicketCreateActionType.CHANGE_DURATION,
            payload: duration
        }
    }

}

const TicketCreateReducer = <T extends TicketPayload>(state: TicketCreateVM<T>, {type, payload}: TicketCreateAction<any>) => {
    const newState = {...state} as TicketCreateVM<T>;
    switch (type) {
        case TicketCreateActionType.CHANGE_REASON:
            newState.payload.reason = payload;
            break;
        case TicketCreateActionType.CHANGE_EMPLOYER_CODE:
            // @ts-ignore
            newState.payload = {...newState.payload, employerCode: payload} as unknown as WorkTicketPayload;
            break;
        case TicketCreateActionType.CHANGE_START_POSITION:
            newState.payload.startPosition.street = payload;
            break;
        case TicketCreateActionType.CHANGE_FINISH_POSITION:
            newState.payload.finishPosition.street = payload;
            break;
        case TicketCreateActionType.CHANGE_LEAVE_TIME:
            newState.payload.leaveTime = payload.toDate();
            break;
        case TicketCreateActionType.CHANGE_DURATION:
            newState.payload.arrivalTime = moment(newState.payload.leaveTime.getTime()).add(payload, 'hours').toDate();
            break;
    }
    return newState;
}


export {TicketCreateReducer, TicketCreateActionType, TicketCreationActionBuilder}
