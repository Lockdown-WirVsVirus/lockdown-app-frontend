import {TicketPayload} from "../gen-backend-api/api";

interface TicketCreateVM<T extends TicketPayload> {
    isFormReady: boolean;
    payload: T;
}

export default TicketCreateVM;