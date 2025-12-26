import { useContext, type FunctionComponent } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";






const Header: FunctionComponent = () => {


    const { state, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const logout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    }

    return <header className="header-container">
        <div className="nav-wrapper">
            <div className="nav-main">
                {/* לוגו המערכת */}
                <div className="logo">HelpDesk Pro</div>

                {/* תפריט ניווט דינמי */}
                <nav className="nav-links">
                    {state.token && <Link to="/dashboard" className="nav-item">לוח בקרה</Link>}

                    {state.user?.role === "admin" && (
                        <div className="admin-menu">
                            <Link to="/users">ניהול משתמשים</Link>
                            <Link to="/tickets/ticketList">כל הטיקטים</Link>
                            <Link to="/statuses">הגדרות סטטוסים</Link>
                            <Link to="/priorities">רמות דחיפות</Link>
                        </div>
                    )}

                    {state.user?.role === "agent" && (
                        <Link to="/tickets/ticketList" className="nav-item active">הפניות שלי</Link>
                    )}

                    {state.user?.role === "customer" && (
                        <>
                            <Link to="/tickets/ticketList" className="nav-item">היסטוריית פניות</Link>
                            <Link to="/tickets/new" className="btn-primary">פתיחת פנייה חדשה +</Link>
                        </>
                    )}
                </nav>
            </div>

            {/* אזור משתמש */}
            <div className="user-actions">
                {state.token ? (
                    <div className="user-profile">
                        <span className="user-name">שלום, {state.user?.name}</span>
                        <button onClick={logout} className="btn-logout">התנתקות</button>
                    </div>
                ) : (
                    <button onClick={() => navigate("/login")} className="btn-login">כניסה למערכת</button>
                )}
            </div>
        </div>
    </header>
}
export default Header