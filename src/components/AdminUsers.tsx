import React, { useCallback, useContext, useEffect, useState, type FunctionComponent } from "react";

import { createUser, getAllUsers } from "../pages/usersApi";

import type { User } from "../models/user";


import { AuthContext } from "../context/AuthContext";

import {
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    MenuItem,


} from '@mui/material';
import Swal from "sweetalert2";




const AdminUsers: FunctionComponent = () => {

    const [users, setUsers] = useState<User[]>([]);
   
    const [error, setError] = useState<string | null>(null);
    const { state } = useContext(AuthContext);
    const [showAddUser, setShowAddUser] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer"
    });
    const loaderUsers = useCallback(async () => {

        if (!state.token) return;
        setLoadingUsers(true);
        setError(null);

        try {
            const dataUsers = await getAllUsers(state.token);

            setUsers(dataUsers);
        } catch (err: any) {
            if (err.response?.status === 409)
                setError(err.response.data.message)

            else
                setError("שגיאה בטעינת משתמשים");


        }
        finally {
            setLoadingUsers(false);
        }
    }, [state.token]);
    useEffect(() => {

        if (state.token)
            loaderUsers();

    }, [state.token]);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {


            await createUser(formData, state.token!);

            setFormData({
                name: "",
                email: "",
                password: "",
                role: "customer"
            });
            setShowAddUser(!showAddUser)
            loaderUsers(); // רענון רשימת משתמשים
            Swal.fire({
                title: 'המשתמש נוסף!',
                text: 'המשתמש פורסם בהצלחה.',
                icon: 'success',
                confirmButtonText: 'מעולה',
                confirmButtonColor: '#28a745', // צבע ירוק להצלחה
                timer: 2500, // ההודעה תיסגר אוטומטית אחרי 2.5 שניות
                timerProgressBar: true
            });
        } catch (err: any) {
            setError(err.response?.data?.message || "שגיאה בהוספת משתמש");
            Swal.fire({
                title: 'אופס...',
                text: 'חלה שגיאה בשמירת המשתמש. כדאי לנסות שוב.',
                icon: 'error',
                confirmButtonText: 'הבנתי'
            });
        } finally {
            setSubmitting(false);
        }
    }


    if (loadingUsers) return <p>טוען משתמשים...</p>;
    if (error) return <p>{error}</p>
    return (<>




        <div className="table-page-container">
            <div className="table-card">
                <div className="table-header-actions">
                    <h2>ניהול משתמשים</h2>
                    <button
                        className={`btn-add-user ${showAddUser ? 'active' : ''}`}
                        onClick={() => setShowAddUser(!showAddUser)}
                    >
                        {showAddUser ? "✕ סגור טופס" : "+ הוסף משתמש חדש"}
                    </button>
                    {showAddUser && <Box
                        component="form"
                        onSubmit={handleSubmit}
                        dir="rtl"
                        sx={{
                            maxWidth: 400,
                            margin: "auto",
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            boxShadow: 3,
                            borderRadius: 2,
                            bgcolor: "background.paper",
                        }}
                    >
                        <Typography variant="h5" component="h3" textAlign="center" gutterBottom>
                            הוספת משתמש חדש
                        </Typography>

                        <TextField
                            fullWidth
                            label="שם"
                            name="name"
                            variant="outlined"
                            value={formData.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                            required
                        />

                        <TextField
                            fullWidth
                            label="אימייל"
                            name="email"
                            type="email"
                            variant="outlined"
                            value={formData.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                            required
                        />

                        <TextField
                            fullWidth
                            label="סיסמה"
                            name="password"
                            type="password"
                            variant="outlined"
                            value={formData.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                            required
                        />

                        <TextField
                            select
                            label="תפקיד"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                           
                        >
                            <MenuItem value="customer">Customer</MenuItem>
                            <MenuItem value="agent">Agent</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </TextField>

                        <Button variant="contained" type="submit" disabled={submitting}>
                            {submitting ? "שומר..." : "הוסף משתמש"}
                        </Button>

                        {error && <Alert severity="error">{error}</Alert>}
                    </Box>
                    }


                </div>

                <div className="table-responsive">
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>שם המשתמש</th>
                                <th>כתובת אימייל</th>
                                <th>תפקיד</th>
                                <th>סטטוס</th>
                                <th>תאריך הצטרפות</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="id-cell">#{user.id}</td>
                                    <td className="name-cell">{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`role-pill ${user.role}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-dot ${user.is_active ? 'active' : 'inactive'}`}>
                                            {user.is_active ? "פעיל" : "לא פעיל"}
                                        </span>
                                    </td>
                                    <td className="date-cell">{new Date(user.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    </>);




};
export default AdminUsers;