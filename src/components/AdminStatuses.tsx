import { useContext, useEffect, useState, type FunctionComponent } from "react";
import { createStatues, getStatuses } from "../pages/ticketsApi";
import { AuthContext } from "../context/AuthContext";

import type { TicketStatus } from "../models/tickets";




const AdminStatuses: FunctionComponent = () => {

    const { state } = useContext(AuthContext);
    const [statues, setstatues] = useState("");
    const [statuesArray, setstatuesArray] = useState([]);

    const loadStatues = async () => {
        const data = await getStatuses(state.token!);
        setstatuesArray(data);
    }
    const create = async () => {
        const data = await createStatues(statues, state.token!);
        setstatues(data.name);
        loadStatues();

    }


    useEffect(() => {


        loadStatues();


    }, [])

    return (
    <div className="admin-page-container">
        <div className="status-management-card">
            <header className="card-header">
                <h2>ניהול סטטוסים</h2>
                <p>צפה ועדכן את רשימת הסטטוסים הזמינים במערכת</p>
            </header>

            <ul className="status-list">
                {statuesArray.map((statue: TicketStatus, i) => (
                    <li key={i} className="status-item">
                        <span className="status-indicator"></span>
                        {statue.name}
                    </li>
                ))}
            </ul>

            <div className="add-status-form">
                <input
                    className="modern-input"
                    placeholder="שם סטטוס חדש..."
                    value={statues}
                    onChange={e => setstatues(e.target.value)}
                />
                <button className="btn-save" onClick={create}>הוסף סטטוס</button>
            </div>
        </div>
    </div>)

}
export default AdminStatuses;