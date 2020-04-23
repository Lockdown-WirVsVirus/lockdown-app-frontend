import {Address, TicketRequestDto} from "../gen-backend-api/api";
import IdentityProvider from "./identityProvider";

const TicketHelper = {

    mapReasonToGerman: (reason: string) => {

        switch(reason) {
            case 'work': {
                return 'Arbeiten';
            }
            case 'food': {
                return 'Lebensmittel Einkauf';
            }
            case 'health': {
                return 'Arzt';
            }
            case 'help': {
                return 'Hilfeleistung für Mitbürger';
            }
            case 'recreation': {
                return 'Spazieren';
            }
            case 'jogging': {
                return 'Joggen'
            }
            default: {
                return reason;
            }
        }

    },

    emptyAddress: (value: string): Address => {
        return {
            street: value || '',
            houseNumber: '',
            zipCode: '',
            city: '',
            country: ''
        } as Address
    },
    emptyTicketPayload: (): TicketRequestDto => {
        return {
            passportId: IdentityProvider.getIdentity()?.identificationDocumentId,
            reason: '',
            startAddress: TicketHelper.emptyAddress(''),
            endAddress: TicketHelper.emptyAddress(''),
            validFromDateTime: new Date(),
            validToDateTime: new Date()
        };
    },
}

export default TicketHelper;