import {Address, TicketPayload} from "../gen-backend-api/api";

const TicketHelper = {

    emptyAddress: (): Address => {
        return {
            street: '',
            houseNo: 0,
            postalCode: ' ',
            city: ' ',
            province: ' ',
            country: ' '
        } as Address
    },
    emptyTicketPayload: <T extends TicketPayload>(): T => {
        return {
            hashIdentityNumber: '',
            reason: '',
            leaveTime: new Date(),
            startPosition: TicketHelper.emptyAddress(),
            finishPosition: TicketHelper.emptyAddress(),
            signature: '',
            userPin: 0
        } as T
    }
}

export default TicketHelper;