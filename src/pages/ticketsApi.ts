import axios from "axios";
import { apiUrl } from "./loginApi";
import type { NewTicket } from "../models/tickets";




export const getAllTicketes = async (token: string) => {


    const ticketsData = await axios.get(apiUrl + "tickets", { headers: { Authorization: `Bearer ${token}` } })

    return ticketsData.data;
}
export const getStatuses = async (token: string) => {


    const statusesData = await axios.get(apiUrl + "statuses", { headers: { Authorization: `Bearer ${token}` } })

    return statusesData.data;
}
export const getPriorities = async (token: string) => {


    const prioritiesData = await axios.get(apiUrl + "priorities", { headers: { Authorization: `Bearer ${token}` } })

    return prioritiesData.data;
}
export const updateTicket = async (assigned_to: number | null, status_id: number, priority_id: number, token: string, ticketId: number) => {

    const updateData = await axios.patch(apiUrl + `tickets/${ticketId}`, { assigned_to, status_id, priority_id }, { headers: { Authorization: `Bearer ${token}` } })

    return updateData.data;
}
export const updateStatus = async (ticket_id: number, token: string, statusId: number) => {

    const updateData = await axios.patch(`${apiUrl}tickets/${ticket_id}`, { status_id: statusId }, { headers: { Authorization: `Bearer ${token}` } })

    return updateData.data;
}
export const createStatues = async (statusName: string, token: string) => {

    const updateData = await axios.post(apiUrl + `statuses`, { name: statusName }, { headers: { Authorization: `Bearer ${token}` } })

    return updateData.data;
}
export const createPriorities = async (priorityName: string, token: string) => {

    const updateData = await axios.post(apiUrl + `priorities`, { name: priorityName }, { headers: { Authorization: `Bearer ${token}` } })

    return updateData.data;
}

export const getTicketById = async (token: string, ticketId: number) => {

    const ticketData = await axios.get(apiUrl + `tickets/${ticketId}`, { headers: { Authorization: `Bearer ${token}` } })

    return ticketData.data;
}
export const getComment = async (token: string, ticketId: number) => {

    const commentData = await axios.get(apiUrl + `tickets/${ticketId}/comments`, { headers: { Authorization: `Bearer ${token}` } })

    return commentData.data;
}
export const addComment = async (comment: string, token: string, ticketId: number) => {

    const commentData = await axios.post(apiUrl + `tickets/${ticketId}/comments`, { content: comment }, { headers: { Authorization: `Bearer ${token}` } })

    return commentData.data;
}
export const addTicket = async (ticket: NewTicket, token: string) => {

    const updateData = await axios.post(apiUrl + `tickets`, ticket, { headers: { Authorization: `Bearer ${token}` } })

    return updateData.data;
}
