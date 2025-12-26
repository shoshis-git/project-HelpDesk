
 export interface Ticket {
    id: number;
    subject: string;
    description: string;
    status_id:number;
    priority_id: number;
    created_at: Date;
    updated_at: Date;
    created_by: number;
    assigned_to: number;
    status_name: string;
    priority_name: string;
    created_by_name: string;
    created_by_email: string;
    assigned_to_name: string;
    assigned_to_email: string;
  
}
 export interface TicketStatus {
    id: number;
    name: string;
}
export interface TicketPriority {
    id: number;
    name: string;
}
export interface Comments{
    id: number;
    ticket_id: number;
    author_id: number;
    content: string;
    created_at: string;
    author_name: string;
    author_email: string;
}
export interface NewTicket {
 
  subject:string,
  description:string,
  priority_id:number

}
