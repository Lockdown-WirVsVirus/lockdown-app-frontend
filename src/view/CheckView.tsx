import React, {useEffect} from "react"
import Cookies from 'universal-cookie';
import {TicketPayload, Address} from "../gen-backend-api/api";
import TicketFacade from "../service/TicketFacade";


export interface CheckViewProperties {

}

const CheckView = (props: CheckViewProperties) => {
    const cookies = new Cookies();
    console.log(cookies.get("hashPersonalID"))

    useEffect(() => {
        const payload: TicketPayload = {
            arrivalTime: new Date().getTime(),
            finishPosition: {} as Address,
            hashIdentityNumber: '234234234',
            leaveTime: new Date().getTime(),
            reason: 'family',
            signature: 'wrwerwer',
            startPosition: {} as Address,
            userPin: 1232
        } as unknown as TicketPayload
        TicketFacade.createTicket(payload).then(result => {
            console.log(result);
        }).catch(error => {
            console.error(error);
        });
    }, [])
    return (
        <h2>{cookies.get("firstname")}</h2>
    );
};


export default CheckView