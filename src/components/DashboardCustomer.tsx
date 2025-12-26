import type { FC } from "react";
import { Link } from "react-router-dom";




const CustomerDashboard: FC = () => {
  return <>
    <h2>אזור לקוח</h2>

    <Link to="/tickets/ticketList">הטיקטים שלי</Link>
    <br />
    <Link to="/tickets/new">פתיחת טיקט חדש</Link>
  </>;
}
export default CustomerDashboard;