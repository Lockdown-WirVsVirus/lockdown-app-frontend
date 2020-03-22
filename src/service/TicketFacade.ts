import axios, {AxiosPromise, AxiosResponse} from 'axios';
import {Configuration, ConfigurationParameters, DefaultApi} from "../gen-backend-api";
import WindowConfig from "./WindowConfig";
import {TicketPayload, TicketRequest} from "../gen-backend-api/models";


class TicketFacade {

    static instance: TicketFacade;
    private config: Configuration = new Configuration({basePath: WindowConfig.BACKEND_URL} as ConfigurationParameters);
    private api: DefaultApi = new DefaultApi(this.config);

    constructor() {
        if (TicketFacade.instance) {
            return TicketFacade.instance
        }
        TicketFacade.instance = this;
    }

    createTicket(ticketPayload: TicketPayload): AxiosPromise<TicketRequest> {
        return this.api.addTicketRequest(ticketPayload);
    }

    getAllTickets(id:number, pin:number){
        return this.api.getTicketRequest(id, pin);
    }

    getAllByPin(pin:number, hash:string){
        return this.api.findTicketRequestsByPin(pin,hash);
    }



}

export default TicketFacade;