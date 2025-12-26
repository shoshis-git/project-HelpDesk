import { useContext, type FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";




const Footer: FunctionComponent = () => {

    const { state, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    }
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4 className="footer-title">HelpDesk</h4>
                    <p>&copy; 2025 כל הזכויות שמורות.</p>
                </div>



                <div className="footer-section">
                    <h4 className="footer-title">אזור אישי</h4>
                    {state.token ? (
                        <>
                        <button onClick={logout} className="btn-footer">התנתקות</button>
                        <br />
                        <Link to="/dashboard">חזרה ללוח הבקרה</Link></>
                    ) : (
                        <button onClick={() => navigate("/login")} className="btn-footer">כניסה</button>
                    )}
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">צור קשר</h4>
                    <div className="contact-item"><a href="123-456-789">📞 123-456-789</a></div>
                    <div className="contact-item"><a href="mailto:office@helpdesk.co.il">📧 office@helpdesk.co.il</a></div>
                    <div className="contact-item">📍 רחוב הטכנולוגיה 5, תל אביב</div>
                </div>
            </div>
        </footer>
    );

}
export default Footer