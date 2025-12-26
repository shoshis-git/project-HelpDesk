# 📌 Helpdesk System

A Helpdesk system for managing support tickets between customers, agents, and administrators.  
The system allows creating tickets, routing them, handling updates, managing statuses and priorities, and communicating through comments — all based on user roles and permissions.

---

## ⚙️ What the System Does

Users can register and log in to the system.

### Customers Can:
- Open new tickets  
- View tickets they created  
- Add comments to their tickets  

### Agents Can:
- View tickets assigned to them  
- Update ticket status  
- Add comments  

### Admins Can:
- View all tickets  
- Assign tickets to agents  
- Update ticket status and priority  
- Manage users  
- Manage ticket statuses and priorities  

---

## 👥 User Roles

| Role     | Main Permissions                                        |
|----------|--------------------------------------------------------|
| Customer | Create tickets, view personal tickets, add comments   |
| Agent    | Handle assigned tickets, update status, add comments |
| Admin    | Full management: tickets, users, statuses, priorities|

---

## ▶️ Run Instructions (Frontend)

1. Make sure Node.js is installed (version 18+ recommended)  

2. Install dependencies:

```bash
npm install
npm run dev
http://localhost:5173
Make sure the backend server is running and the API base URL is correctly configured in the project.


Usage

Register as a new user or login if you already have an account.

Depending on your role, you can create tickets, view tickets, manage tickets, or administer the system.