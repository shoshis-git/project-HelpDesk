import { useContext, type FunctionComponent } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminDashboard from "./DashboardAdmin";
import AgentDashboard from "./DashboardAgent";
import CustomerDashboard from "./DashboardCustomer";







const Dashboard: FunctionComponent<any> = () => {

    
    const { state } = useContext(AuthContext);



    if (state.loading || !state.user) {
        return <p>טוען משתמש...</p>;
    }



    const role = state.user!.role;
    return (
        <>
            <div className="page-wrapper">
                <div className="central-container">

                    <header className="welcome-section">
                        <div className="avatar-circle">
                            {state.user?.name.charAt(0)}
                        </div>
                        <h1>שלום, {state.user?.name}</h1>
                        <div className={`role-tag ${role}`}>ממשק {role}</div>

                        {/* פס דקורטיבי עדין */}
                        <div id="underline" style={{

                        }}></div>
                    </header>

                    <main className="dashboard-wrapper">
                        {role === "admin" && <AdminDashboard />}
                        {role === "agent" && <AgentDashboard />}
                        {role === "customer" && <CustomerDashboard />}
                    </main>

                </div>
            </div>
        </>
    )
}
export default Dashboard;