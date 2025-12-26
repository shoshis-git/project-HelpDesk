import axios from "axios";
import type { RegisterUser, User } from "../models/user";


export const apiUrl="http://localhost:4000/";

export const login=async (email:string, password:string) => {
    const data=await axios.post(apiUrl+'auth/login', {email, password});
    return data;
}
export const currentUser=async (token:string) => {
    const res=await axios.get(apiUrl+'auth/me', {headers: {Authorization: `Bearer ${token}`}});
    if(res&&res.data){
        return{ 
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
        created_at: res.data.created_at,
        is_active: res.data.is_active}as User
    }
  
}
export const registerCustomer=async(user:RegisterUser)=>{
    const data=await axios.post(apiUrl+'auth/register',{name:user.name,email:user.email,password:user.password} );
   
    return data.data;
}

