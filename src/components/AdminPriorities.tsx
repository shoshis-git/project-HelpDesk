import { useContext, useEffect, useState, type FunctionComponent } from "react";
import { AuthContext } from "../context/AuthContext";

import { createPriorities, getPriorities } from "../pages/ticketsApi";
import type { TicketPriority } from "../models/tickets";





const AdminPriorities: FunctionComponent = () => {

    const { state } = useContext(AuthContext);
    const [priority, setPriority] = useState("");
    const [priorities, setPriorities] = useState([]);

    const loaderPriorities = async () => {
        const data = await getPriorities(state.token!);
        setPriorities(data);

    }
    const create = async () => {
        const data = await createPriorities(priority, state.token!);
        setPriority(data.name);
        loaderPriorities();
    }

    useEffect(() => {

        loaderPriorities();
    }, [])



    return (<div className="admin-page-container">
        <div className="priority-management-card">
            <header className="card-header">
                <div className="header-icon">⚡</div>
                <h2>ניהול רמות עדיפות</h2>
                <p>הגדר את רמות הדחיפות עבור פניות במערכת</p>
            </header>

            <ul className="priority-list">
                {priorities.map((priority: TicketPriority, i) => (
                    <li key={i} className="priority-item">
                        <span className="priority-dot"></span>
                        <span className="priority-name">{priority.name}</span>
                    </li>
                ))}
            </ul>

            <div className="add-priority-form">
                <input
                    type="text"
                    className="modern-input"
                    placeholder="שם עדיפות חדשה (למשל: דחוף)"
                    onChange={(e) => setPriority(e.target.value)}
                />
                <button className="btn-add-priority" onClick={create}>
                    <span>+</span> הוספה
                </button>
            </div>
        </div>
    </div>)
}
export default AdminPriorities;