import type { FC } from "react"
import { Outlet } from "react-router-dom"





const Tickets:FC = () => {
    return <>
    <h2>טיקטים</h2>
    <Outlet /></>
}
export default Tickets