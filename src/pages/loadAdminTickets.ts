import type {  TicketsAction } from "../context/TicketsContext";
import type { User } from "../models/user";
import { getAllTicketes, getPriorities, getStatuses } from "./ticketsApi";
import { getAllUsers } from "./usersApi";


export const loadAdminTickets=async(dispatch:React.Dispatch<TicketsAction>,token:string)=>{


        dispatch({ type: "LOAD_START" });

        try{
            const [ticketsRes,usersRes,statuesesRes,priorityRes]=await Promise.all([
                getAllTicketes(token),
                getAllUsers(token),
                 getStatuses(token),
                 getPriorities(token)

            ]);

            dispatch({
                type:"LOAD_SUCCESS",
                payload:{
                    tickets:ticketsRes,
                    agents:usersRes.filter((u: User)=>u.role=="agent"),
                    statuses:statuesesRes,
                    priorities:priorityRes


                }

            });
        }
        catch(err){
                dispatch({
                    type:"LOAD_FAILURE",
                    payload:"שגיאה בטעינת הנתונים"
                })
        }
        


}