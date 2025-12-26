import type { FC } from "react";
import { Link } from "react-router-dom";






const AgentDashboard: FC = () => {
  return <>
    <h2>אזור Agent</h2>

    <p>כאן תוכל לטפל בטיקטים שהוקצו אליך</p>
    <Link to="/tickets/ticketList">לטיקטים שלי</Link>
  </>
}
export default AgentDashboard;