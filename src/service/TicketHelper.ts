import {Address, TicketRequestDto} from "../gen-backend-api/api";
import IdentityProvider from "./identityProvider";

const TicketHelper = {

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
            passportId: IdentityProvider.getIdentity().identificationDocumentId,
            reason: 'sports',
            startAddress: TicketHelper.emptyAddress('blub'),
            endAddress: TicketHelper.emptyAddress('bla'),
            validFromDateTime: new Date(),
            validToDateTime: new Date()
        };
    },
}

export default TicketHelper;