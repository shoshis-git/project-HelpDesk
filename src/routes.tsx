import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Login";
import AuthProvider from "./context/AuthContext";
import App from "./App";
import Dashboard from "./components/Dashboard";
import Rules from "./rules";


import AdminUsers from "./components/AdminUsers";
import AdminStatuses from "./components/AdminStatuses";
import AdminPriorities from "./components/AdminPriorities";
import TicketsProvider from "./context/TicketsContext";
import TicketDetails from "./components/TicketDetails";
import Register from "./components/Register";
import Tickets from "./components/Tickets";
import NewTickets from "./components/NewTicket";
import TicketsList from "./components/TicketsList";






const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to="/login" replace />
            },
            {
                path: "login",
                element: <Login />,
                errorElement: <div>error</div>

            },
            {
                path: "dashboard",
                element: <Rules><Dashboard /></Rules>,
                errorElement: <div>error</div>,



            },
            {
                path: "register",
                element: <Register />,
                errorElement: <div>error</div>
            },

            {
                path: "tickets",
                element: <TicketsProvider><Tickets /></TicketsProvider>,
                errorElement: <div>error</div>,
                children: [
                    {
                        path: "ticketList",
                        element: <TicketsList />,
                        errorElement: <div>error</div>,
                    },
                    {
                        path: "new",
                        element: <Rules rules={["customer"]}><NewTickets /></Rules>,
                        errorElement: <div>error</div>,
                    },
                    {
                        path: ":id",
                        element: <TicketDetails />,
                        errorElement: <div>error</div>,
                    }
                ]

            },
            {
                path: "users",
                element: <Rules rules={["admin"]}><AdminUsers /></Rules>,

            },

            {
                path: "statuses",
                element: <AdminStatuses />,

            },
            {
                path: "priorities",
                element: <AdminPriorities />,
            }


        ],

    },
    {
        path: "*",
        element: <div>not found</div>
    }
])

export default routes;


