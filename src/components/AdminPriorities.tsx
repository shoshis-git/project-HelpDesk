import { useContext, useEffect, useState, type FunctionComponent } from "react";
import { AuthContext } from "../context/AuthContext";

import { createPriorities, getPriorities } from "../pages/ticketsApi";
import type { TicketPriority } from "../models/tickets";
import { set } from "react-hook-form";
import Swal from "sweetalert2";





const AdminPriorities: FunctionComponent = () => {

    const { state } = useContext(AuthContext);
    const [priority, setPriority] = useState("");
    const [priorities, setPriorities] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const loaderPriorities = async () => {
        set
        try {
            const data = await getPriorities(state.token!);
            setPriorities(data);
        }
        catch (err: any) {
            setError(err.response?.data?.message || "שגיאה בטעינת רמות עדיפות");
        }
        finally {
            setLoading(false);
        }

    }
    const create = async () => {
        setLoading(true);
        try {
            const data = await createPriorities(priority, state.token!);
            setPriority(data.name);
            loaderPriorities();
            Swal.fire({
                title: 'העדיפות נוספה!',
                text: 'העדיפות נוספה בהצלחה.',
                icon: 'success',
                confirmButtonText: 'מעולה',
                confirmButtonColor: '#28a745', // צבע ירוק להצלחה
                timer: 2500, // ההודעה תיסגר אוטומטית אחרי 2.5 שניות
                timerProgressBar: true
            });

        }
        catch (err: any) {
            setError(err.response?.data?.message || "שגיאה בהוספת רמה עדיפות");
            Swal.fire({
                title: 'אופס...',
                text: 'חלה שגיאה בהוספת העדיפות. כדאי לנסות שוב.',
                icon: 'error',
                confirmButtonText: 'הבנתי'
            });
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        loaderPriorities();
    }, [])

    if (loading) return <h2>loading...</h2>;
    if (error) return <h2>{error}</h2>;

    return (<div className="admin-page-container" >
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