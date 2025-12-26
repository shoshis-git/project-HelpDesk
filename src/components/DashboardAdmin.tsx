import { Link, Outlet } from "react-router-dom";






const AdminDashboard: React.FC = () => {
  return (
    <>
      <h1>ניהול מערכת</h1>

      <nav>
        <Link to="/users">משתמשים</Link> |{" "}
        <Link to="/tickets/ticketList">טיקטים</Link> |{" "}
        <Link to="/statuses">סטטוסים</Link> |{" "}
        <Link to="/priorities">עדיפויות</Link>
      </nav>

      <Outlet />
    </>
  )
}
export default AdminDashboard;