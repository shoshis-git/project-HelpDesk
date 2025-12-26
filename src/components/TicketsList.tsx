import { useContext, useEffect, useState, type FunctionComponent } from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import { TicketsContext } from "../context/TicketsContext";

import { getAllTicketes, getPriorities, getStatuses } from "../pages/ticketsApi";

import { getAllUsers } from "../pages/usersApi";
import type { User } from "../models/user";
import type { Ticket } from "../models/tickets";








const TicketsList: FunctionComponent = () => {
  const { state, dispatch } = useContext(TicketsContext);
  const { state: auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sortByPriority, setSortByPriority] = useState<"asc" | "desc" | null>(null);

  useEffect(() => {
    if (!auth.token) return

    const loadTickets = async () => {
      if (!auth.token) return

      dispatch({ type: "LOAD_START" });


      try {

        const tickets = await getAllTicketes(auth.token);
        let agents = [];
        let ticketsFilterd = []
        if (auth.user?.role == "admin") {
          const users = await getAllUsers(auth.token);
          agents = users.filter((user: User) => user.role === "agent");
          ticketsFilterd = tickets;

        }
        else if (auth.user?.role == "agent") {
          ticketsFilterd = tickets.filter((ticket: Ticket) => ticket.assigned_to === auth.user?.id);

        }
        else if (auth.user?.role == "customer") {
          ticketsFilterd = tickets.filter((ticket: Ticket) => ticket.created_by === auth.user?.id);
        }
        const statues = await getStatuses(auth.token);
        const priority = await getPriorities(auth.token);
        console.log("auth.user", auth.user);
        console.log("tickets from API", tickets);


        dispatch({
          type: "LOAD_SUCCESS", payload: {
            tickets: tickets,
            agents: agents,
            statuses: statues,
            priorities: priority
          }
        });
      }
      catch {
        dispatch({ type: "LOAD_FAILURE", payload: "Failed to load tickets" });
      }

    }
    loadTickets();
  }, [auth.token, auth.user?.id])
  const sortedTickets = sortByPriority
    ? [...state.tickets].sort((a, b) =>
      sortByPriority === "asc"
        ? a.priority_id - b.priority_id
        : b.priority_id - a.priority_id
    )
    : state.tickets;


  if (state.loading) {
    return <div>Loading...</div>
  }
  if (state.error) {
    return <div>{state.error}</div>
  }

  return (
    <div className="tickets-page-container">
      <div className="tickets-card">

        {/* אזור כותרת וסינון */}
        <div className="tickets-header">
          <h2>ניהול פניות שירות</h2>

          <div className="filter-section">
            <label>מיון לפי עדיפות:</label>
            <select
              className="modern-select"
              value={sortByPriority ?? ""}
              onChange={e => setSortByPriority(e.target.value as "asc" | "desc" | null)}
            >
              <option value="">ללא מיון</option>
              <option value="asc">↑ מהנמוכה לגבוהה</option>
              <option value="desc">↓ מהגבוהה לנמוכה</option>
            </select>
          </div>
        </div>

        {/* טבלה רספונסיבית */}
        <div className="table-wrapper">
          <table className="modern-tickets-table">
            <thead>
              <tr>
                <th>ID</th>
                {(auth.user?.role === "admin" || auth.user?.role === "agent") && <th>לקוח</th>}
                <th>נושא</th>
                <th>תיאור</th>
                <th>סטטוס</th>
                <th>עדיפות</th>
                <th>נוצר ב-</th>
                {auth.user?.role === "admin" && <th>סוכן מטפל</th>}
              </tr>
            </thead>
            <tbody>
              {sortedTickets.map(ticket => (
                <tr
                  key={ticket.id}
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                  className="ticket-row"
                >
                  <td className="id-col">#{ticket.id}</td>
                  {(auth.user?.role === "admin" || auth.user?.role === "agent") && <td>{ticket.created_by_name}</td>}
                  <td className="subject-col">{ticket.subject}</td>
                  <td className="desc-col">{ticket.description}</td>
                  <td>
                    <span className={`status-badge status-${ticket.status_name}`}>
                      {ticket.status_name}
                    </span>
                  </td>
                  <td>
                    <span className={`priority-tag priority-${ticket.priority_name}`}>
                      {ticket.priority_name}
                    </span>
                  </td>
                  <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
                  {auth.user?.role === "admin" && <td>{ticket.assigned_to_name}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Outlet />
    </div>



  )





}
export default TicketsList;