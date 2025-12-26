import { createContext, useReducer } from "react";
import type { Comments, TicketPriority, Ticket, TicketStatus } from "../models/tickets";
import type { User } from "../models/user";

export interface InitialTicketsState {
  tickets: Ticket[],
  selectedTicket: Ticket | null,
  comments: Comments[],
  agents: User[],
  statuses: TicketStatus[],
  priorities: TicketPriority[],
  loading: boolean,
  error: string | null
}

export type TicketsAction = { type: "LOAD_START" } |
{
  type: "LOAD_SUCCESS",
  payload: { tickets: Ticket[], agents: User[], statuses: TicketStatus[], priorities: TicketPriority[] }
} |
{ type: "LOAD_FAILURE", payload: string } |
{
  type: "LOAD_TICKET_DETAILS";
  payload: { ticket: Ticket, agents: User[], statuses: TicketStatus[], priorities: TicketPriority[], comments: Comments[] };
}
  |
{ type: "ADD_COMMENT"; payload: Comments } |
{ type: "UPDATE_TICKET"; payload: Ticket } |
{ type: "NEW_TICKET", payload: Ticket } |
{ type: "LOAD_PRIORITY", payload: TicketPriority[] };


const reducerTickets = (state: InitialTicketsState, action: TicketsAction) => {
  switch (action.type) {
    case "LOAD_START":
      return {
        ...state, loading: true, error: null
      }
    case "LOAD_SUCCESS":
      return { ...state, ...action.payload, loading: false, error: null }
    case "LOAD_FAILURE":
      return { ...state, loading: false, error: action.payload }
    case "LOAD_TICKET_DETAILS":
      return {
        ...state,
        selectedTicket: action.payload.ticket,
        agents: action.payload.agents,
        statuses: action.payload.statuses,
        priorities: action.payload.priorities,
        comments: action.payload.comments,
        loading: false,
        error: null
      };

    case "ADD_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.payload],
        loading: false,

      };

    case "UPDATE_TICKET":
      return {
        ...state,
        tickets: state.tickets.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
        selectedTicket: action.payload,
        loading: false
      };

    case "NEW_TICKET":
      return {
        ...state,
        selectedTicket: action.payload,
        tickets: [...state.tickets, action.payload],

        loading: false
      };

    case "LOAD_PRIORITY":
      return {
        ...state,
        priorities: action.payload
      };

    default:
      return state;
  }
}

interface TicketsProviderProps {
  children: React.ReactNode;
}

export const TicketsContext = createContext<TicketsContextType>(
  {
    state: { tickets: [], selectedTicket: null, comments: [], agents: [], statuses: [], priorities: [], loading: false, error: null },
    dispatch: () => { }
  });
interface TicketsContextType {
  state: InitialTicketsState;
  dispatch: React.Dispatch<TicketsAction>;
}

const TicketsProvider: React.FC<TicketsProviderProps> = ({ children }) => {

  const [state, dispatch] = useReducer(reducerTickets, { tickets: [], selectedTicket: null, comments: [], agents: [], statuses: [], priorities: [], loading: false, error: null });

  return <TicketsContext.Provider value={{ state, dispatch }}>{children}</TicketsContext.Provider>;
};

export default TicketsProvider
