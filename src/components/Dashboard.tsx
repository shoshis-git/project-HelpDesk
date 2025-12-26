import { use, useContext, useEffect, type FunctionComponent } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminDashboard from "./DashboardAdmin";
import AgentDashboard from "./DashboardAgent";
import CustomerDashboard from "./DashboardCustomer";
import { Outlet } from "react-router-dom";






const Dashboard: FunctionComponent<any> = () => {

    console.log("DASHBOARD RENDER");
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
                        <div style={{
                            width: '50px',
                            height: '4px',
                            background: '#3b82f6',
                            margin: '20px auto 0',
                            borderRadius: '2px'
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