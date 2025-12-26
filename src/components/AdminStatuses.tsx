import { useContext, useEffect, useState, type FunctionComponent } from "react";
import { createStatues, getStatuses } from "../pages/ticketsApi";
import { AuthContext } from "../context/AuthContext";

import type { TicketStatus } from "../models/tickets";
import { set } from "react-hook-form";
import Swal from "sweetalert2";




const AdminStatuses: FunctionComponent = () => {

    const { state } = useContext(AuthContext);
    const [statues, setstatues] = useState("");
    const [statuesArray, setstatuesArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const loadStatues = async () => {
        setLoading(true);
        try {
            const data = await getStatuses(state.token!);
            setstatuesArray(data);
        }
        catch (err: any) {
            setError(err.response?.data?.message || "שגיאה בטעינת סטטוס");
        }
        finally {
            setLoading(false);
        }
    }
    const create = async () => {
        setLoading(true);
        try {
            const data = await createStatues(statues, state.token!);
            setstatues(data.name);
            loadStatues();
            Swal.fire({
                title: 'הסטטוס נשמר!',
                text: 'הסטטוס נשמר בהצלחה.',
                icon: 'success',
                confirmButtonText: 'מעולה',
                confirmButtonColor: '#28a745', // צבע ירוק להצלחה
                timer: 2500, // ההודעה תיסגר אוטומטית אחרי 2.5 שניות
                timerProgressBar: true
            });

        }
        catch (err: any) {
            setError(err.response?.data?.message || "שגיאה בהוספת סטטוס");
            Swal.fire({
                title: 'אופס...',
                text: 'חלה שגיאה בהוספת הסטטוס. כדאי לנסות שוב.',
                icon: 'error',
                confirmButtonText: 'הבנתי'
            });
        }
        finally {
            setLoading(false);
        }


    }


    useEffect(() => {


        loadStatues();


    }, [])
    if (loading) {
        <p>טוען סטטוס...</p>
    }
    if (error) {
        <p>{error}</p>
    }

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