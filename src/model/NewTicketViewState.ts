import {TicketPayload} from "../gen-backend-api/api";

export default interface NewTicketViewState extends TicketPayload {
    isComplete: boolean;
    errors: any[]; // TODO -later more specific model
}
