import { useContext, useEffect, useState, type FunctionComponent } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { TicketsContext } from "../context/TicketsContext";
import { addComment, getComment, getPriorities, getStatuses, getTicketById, updateStatus, updateTicket } from "../pages/ticketsApi";
import type { Comments, TicketPriority, TicketStatus } from "../models/tickets";
import type { User } from "../models/user";
import { getAllUsers } from "../pages/usersApi";




interface TicketDetailsProps { }


const TicketDetails: FunctionComponent<TicketDetailsProps> = () => {


    const { state: auth } = useContext(AuthContext);
    const { id } = useParams<{ id: string }>();
    const { state, dispatch } = useContext(TicketsContext);


    const [comment, setComment] = useState<string>("");
    const [assignedTo, setAssignedTo] = useState<number | null>(null);
    const [statusId, setStatusId] = useState<number>(0);
    const [priorityId, setPriorityId] = useState<number>(0);

    useEffect(() => {
        if (!auth.token || !id) return;


        const loadTicket = async () => {
            dispatch({ type: "LOAD_START" });
            try {
                const ticket = await getTicketById(auth.token!, Number(id!));
                const comments = await getComment(auth.token!, Number(id!));
                let agents: User[] = [];
                let statuses: TicketStatus[] = [];
                let priorities: TicketPriority[] = [];

                if (auth.user?.role == "admin" || auth.user?.role == "agent") {
                    if (!auth.token) return
                    if (auth.user?.role == "admin") {
                        const users = await getAllUsers(auth.token);
                        agents = users.filter((user: User) => user.role === "agent");
                    }


                    statuses = await getStatuses(auth.token);

                    priorities = await getPriorities(auth.token);

                }


                dispatch({ type: "LOAD_TICKET_DETAILS", payload: { ticket, agents, statuses, priorities, comments } });
                setAssignedTo(ticket.assigned_to || null);
                setStatusId(ticket.status_id);
                setPriorityId(ticket.priority_id);
            }
            catch {
                dispatch({ type: "LOAD_FAILURE", payload: "Failed to load ticket details" });
            }


        }
        loadTicket();

    }, [id, auth.token, dispatch])
    const handleSave = async () => {
        if (!auth.token || !state.selectedTicket) return;
        try {
            dispatch({ type: "LOAD_START" });

            const updated = await updateTicket(
                assignedTo,
                statusId,
                priorityId,
                auth.token,
                state.selectedTicket.id
            );

            setAssignedTo(updated.assigned_to);
            setStatusId(updated.status_id);
            setPriorityId(updated.priority_id);
            dispatch({
                type: "UPDATE_TICKET",
                payload: updated
            });
        }
        catch (err) {
            dispatch({
                type: "LOAD_FAILURE",
                payload: "Failed to save ticket changes"
            });
        }

    };
    const handleSaveStatues = async () => {
        if (!auth.token || !state.selectedTicket) return;
        try {
            dispatch({ type: "LOAD_START" });

            const updated = await updateStatus(
                state.selectedTicket.id,
                auth.token,
                statusId
            );
            setStatusId(updated.status_id);
            dispatch({
                type: "UPDATE_TICKET",
                payload: updated
            });
        }
        catch (err) {
            dispatch({
                type: "LOAD_FAILURE",
                payload: "Failed to save ticket changes"
            });
        }
    }


    const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: "LOAD_START" });
        try {
            const commentData = await addComment(comment, auth.token!, Number(id!));
            dispatch({ type: "ADD_COMMENT", payload: commentData });
            setComment("");
        }
        catch {
            dispatch({ type: "LOAD_FAILURE", payload: "Failed to add comment" });

        }

    }

    if (state.loading) return <p>טוען...</p>;
    if (state.error) return <p>{state.error}</p>;
    if (!state.selectedTicket) return <p>טיקט לא נמצא</p>;

    return (<div className="details-page-container">
        <div className="ticket-details-card">
            {/* כותרת הפנייה */}
            <header className="ticket-header">
                <span className="ticket-id">פנייה #{state.selectedTicket.id}</span>
                <h2>{state.selectedTicket.subject}</h2>
                <div className="ticket-description">
                    <p>{state.selectedTicket.description}</p>
                </div>
            </header>

            {/* אזור ניהול - מוצג לאדמין או סוכן */}
            {(auth.user?.role === "admin" || auth.user?.role === "agent") && (
                <div className="admin-management-box">
                    <h3>ניהול פנייה</h3>
                    <div className="management-grid">
                        {auth.user?.role === "admin" && (
                            <>
                                <div className="form-group">
                                    <label>מוקצה ל:</label>
                                    <select className="modern-select" value={assignedTo ?? ""} onChange={e => setAssignedTo(Number(e.target.value) || null)}>
                                        <option value="">לא מוקצה</option>
                                        {state.agents.map((a: User) => (
                                            <option key={a.id} value={a.id}>{a.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>עדיפות:</label>
                                    <select className="modern-select" value={priorityId} onChange={e => setPriorityId(Number(e.target.value))}>
                                        {state.priorities.map((p: TicketPriority) => (
                                            <option key={p.id} value={p.id}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}

                        <div className="form-group">
                            <label>סטטוס פנייה:</label>
                            <select className="modern-select" value={statusId} onChange={e => setStatusId(Number(e.target.value))}>
                                {state.statuses.map((s: TicketStatus) => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button className="btn-save-changes" onClick={auth.user?.role === "admin" ? handleSave : handleSaveStatues}>
                        שמור עדכונים
                    </button>
                </div>
            )}

            {/* זרם תגובות */}
            <section className="comments-section">
                <h3>💬 שיחה ותגובות</h3>
                <div className="comments-list">
                    {state.comments.length === 0 ? (
                        <p className="no-comments">אין תגובות עדיין בפנייה זו.</p>
                    ) : (
                        state.comments.map((c: Comments) => (
                            <div key={c.id} className="comment-bubble">
                                <div className="comment-meta">
                                    <strong>{c.author_name}</strong>
                                    <span>{new Date(c.created_at).toLocaleString()}</span>
                                </div>
                                <p className="comment-content">{c.content}</p>
                            </div>
                        ))
                    )}
                </div>

                <form className="add-comment-form" onSubmit={handleAddComment}>
                    <textarea
                        placeholder="כתוב תגובה חדשה..."
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <button type="submit" className="btn-comment">שלח תגובה</button>
                </form>
            </section>
        </div>
    </div>)
}
export default TicketDetails;