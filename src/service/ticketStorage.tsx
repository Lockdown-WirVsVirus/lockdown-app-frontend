import { TicketResponseDto } from "../gen-backend-api/api";

export interface IIdentity {
    firstName: string;
    lastName: string;
    identificationDocumentId: string;
}

export class TicketStorage {
    private static getCurrentTicketsArray(): TicketResponseDto[] {
        const rawStorage = window.localStorage.getItem('tickets');
        if (!rawStorage) {
            return [];
        }

        const rawJson = JSON.parse(rawStorage);
        if (!rawJson) {
            return [];
        }

        if (Array.isArray(rawJson)) {
            return rawJson as TicketResponseDto[];
        } else {
            return [];
        }
    }

    private static saveTicketsArray(tickets: TicketResponseDto[]) {
        window.localStorage.setItem('tickets', JSON.stringify(tickets));
    }

    static clearTickets() {
        window.localStorage.removeItem('tickets');
    }

    static addTicket(ticket: TicketResponseDto) {
        const tickets = TicketStorage.getCurrentTicketsArray();
        tickets.push(ticket);
        TicketStorage.saveTicketsArray(tickets);
    }

    static getInterestingTicket() : TicketResponseDto | null {
        return TicketStorage.getCurrentTicketsArray().length >= 1 ? TicketStorage.getCurrentTicketsArray()[0] : null;
    }

    static getTicketById(ticketId: string) {
        return TicketStorage.getCurrentTicketsArray().find(ticket => ticket.ticketId === ticketId)
    }
}

export default TicketStorage;