import { TicketsStateModel } from './tickets-state-model.interfaces';
import { TicketsStateModelAction } from './tickets-state-model.actions';
import { Ticket } from '@tuskdesk-suite/data-models';

export function ticketsStateModelReducer(state: TicketsStateModel, action: TicketsStateModelAction): TicketsStateModel {
  switch (action.type) {
    case 'TICKETS_LOADED': {
      return action.payload.reduce(
        (acc: TicketsStateModel, ticket: Ticket) => {
          return {
            tickets: { ...acc.tickets, [ticket.id]: ticket },
            ids: [...acc.ids, ticket.id]
          };
        },
        { tickets: {}, ids: [] }
      );
    }
    case 'TICKET_LOADED': {
      const tickets = { ...state.tickets, [action.payload.id]: action.payload };
      const ids = [...state.ids];
      if (!ids.some(id => id === action.payload.id)) {
        ids.push(action.payload.id);
      }
      return {
        tickets,
        ids
      };
    }
    default: {
      return state;
    }
  }
}
