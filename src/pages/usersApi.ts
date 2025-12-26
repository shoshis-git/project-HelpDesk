import axios from "axios";
import { apiUrl } from "./loginApi";

import type { User } from "../models/user";



export const getAllUsers=async(token:string)=>{

    
    const usersData= await axios.get(apiUrl+"users", {headers: {Authorization: `Bearer ${token}`}})

    return usersData.data;
        
}
export const createUser=async(user:Partial<User>, token:string)=>{

    
    const newUserData= await axios.post(apiUrl+"users", user, {headers: {Authorization: `Bearer ${token}`}})

    return newUserData.data;
        
}
