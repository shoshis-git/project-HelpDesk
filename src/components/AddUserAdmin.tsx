import { useState, useContext, type FunctionComponent } from "react";

import { AuthContext } from "../context/AuthContext";
import { createUser } from "../pages/usersApi";
import { 
  TextField, 
  Button, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl, 
  Typography, 
  Box, 
  Alert,
  CircularProgress
} from '@mui/material';
interface AdminUsersProps {
    onUserAdded: () => void;
}


 const AdminAddUser:FunctionComponent<AdminUsersProps> = ({onUserAdded}) =>{
  const { state } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement|HTMLTextAreaElement>) {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  //   };
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
setFormData({
  ...formData,
  [e.target.name]: e.target.value
});
};
  

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        
      createUser(formData, state.token!);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "customer"
      });

       onUserAdded(); // רענון רשימת משתמשים
    } catch (err: any) {
      setError(err.response?.data?.message || "שגיאה בהוספת משתמש");
    } finally {
      setLoading(false);
    }
  }

  return (
    // <form onSubmit={handleSubmit}>
    //   <h3>הוספת משתמש חדש</h3>

    //   <input
    //     name="name"
    //     placeholder="שם"
    //     value={formData.name}
    //     onChange={handleChange}
    //     required
    //   />

    //   <input
    //     name="email"
    //     type="email"
    //     placeholder="אימייל"
    //     value={formData.email}
    //     onChange={handleChange}
    //     required
    //   />

    //   <input
    //     name="password"
    //     type="password"
    //     placeholder="סיסמה"
    //     value={formData.password}
    //     onChange={handleChange}
    //     required
    //   />

    //   <select
    //     name="role"
    //     value={formData.role}
    //     onChange={handleChange}
    //   >
    //     <option value="customer">Customer</option>
    //     <option value="agent">Agent</option>
    //     <option value="admin">Admin</option>
    //   </select>

    //   <button disabled={loading}>
    //     {loading ? "שומר..." : "הוסף משתמש"}
    //   </button>

    //   {error && <p style={{ color: "red" }}>{error}</p>}
    // </form>
    <Box 
  sx={{ 
    maxWidth: 400, 
    margin: 'auto', 
    p: 3, 
    display: 'flex', 
    flexDirection: 'column', 
    gap: 2,
    boxShadow: 3,
    borderRadius: 2,
    bgcolor: 'background.paper'
  }}
  component="form"
  onSubmit={handleSubmit}
  dir="rtl"
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

  <select
    name="role"
    value={formData.role}
    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e)}
  >
    <option value="customer">Customer</option>
    <option value="agent">Agent</option>
    <option value="admin">Admin</option>
  </select>

  <Button variant="contained" type="submit" disabled={loading}>
    {loading ? "שומר..." : "הוסף משתמש"}
  </Button>

  {error && <Alert severity="error">{error}</Alert>}
</Box>
);
}
export default AdminAddUser;
