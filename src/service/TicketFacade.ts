import {DefaultApi} from 'fastpass-api';
import { Configuration, ConfigurationParameters } from '../gen-backend-api';
import WindowConfig from './WindowConfig';
import { AxiosResponse } from 'axios';
import { TicketRequest } from '../gen-backend-api/models';

class TicketFacade {
    static INSTANCE:TicketFacade;
    config:Configuration = new Configuration({baseUrl:WindowConfig.BACKEND_URL} as ConfigurationParameters);
    api:DefaultApi = new DefaultApi(this.config);


    constructor(){
        if(TicketFacade.INSTANCE){
            return TicketFacade.INSTANCE;
        }
        TicketFacade.INSTANCE = this
    }

    createTicket(ticketRequest):Promise<TicketRequest>{
        const response: AxiosResponse<TicketRequest> = this.api.createTicket()
    }
}