import {AxiosPromise} from 'axios';
import {Configuration, ConfigurationParameters} from "../gen-backend-api/configuration";
import WindowConfig from "./WindowConfig";
import {TicketResponseDto, TicketRequestDto, TicketApi} from "../gen-backend-api/api";


class TicketFacadeImpl <T extends TicketRequestDto>{
    static instance: TicketFacadeImpl<any>;
    private config: Configuration = new Configuration({basePath: WindowConfig.BACKEND_URL} as ConfigurationParameters);
    private api: TicketApi = new TicketApi(this.config);


    constructor() {
        console.log('TicketFacade using BACKEND_URL: ', WindowConfig.BACKEND_URL);

        if (TicketFacadeImpl.instance) {
            return TicketFacadeImpl.instance;
        }
        TicketFacadeImpl.instance = this;
    }

    createTicket(ticketPayload: T): AxiosPromise<TicketResponseDto> {
        return this.api.ticketsControllerCreateTicket(ticketPayload);
    }

}

const TicketFacade = (function () {
    return new TicketFacadeImpl();
})()

export default TicketFacade;