import {AxiosPromise} from 'axios';
import {Configuration, ConfigurationParameters} from "../gen-backend-api/configuration";
import WindowConfig from "./WindowConfig";
import {TicketPayload, TicketRequest, DefaultApi} from "../gen-backend-api/api";


class TicketFacadeImpl {
    static instance: TicketFacadeImpl;
    private config: Configuration = new Configuration({basePath: WindowConfig.BACKEND_URL} as ConfigurationParameters);
    private api: DefaultApi = new DefaultApi(this.config);


    constructor() {
        if (TicketFacadeImpl.instance) {
            return TicketFacadeImpl.instance;
        }
        TicketFacadeImpl.instance = this;
    }

    createTicket(ticketPayload: TicketPayload): AxiosPromise<TicketRequest> {
        return this.api.addTicketRequest(ticketPayload);
    }

    getAllTickets(id: number, pin: number) {
        return this.api.getTicketRequest(id, pin);
    }

    getAllByPin(pin: number, hash: string) {
        return this.api.findTicketRequestsByPin(pin, hash);
    }

}

const TicketFacade = (function () {
    return new TicketFacadeImpl();
})()

export default TicketFacade;