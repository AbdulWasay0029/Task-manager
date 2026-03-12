# Task Manager — Backend API

REST API for a collaborative task management system. Handles user authentication, task CRUD, and cross-user task assignment.

---

## Features

- JWT-based authentication with protected routes
- Full CRUD for tasks (create, read, update, delete)
- Assign tasks to other users by email
- Status tracking: `pending` / `completed`
- Separate views for own tasks vs. assigned tasks

---

## Stack

**Node.js · Express.js · MongoDB (Mongoose) · JWT · bcryptjs**

Frontend (separate): React + Vite + TailwindCSS

---

## API Reference

### Auth
```
POST   /api/auth/register     Create account
POST   /api/auth/login        Get JWT token
GET    /api/auth/me           Current user (auth required)
```

### Tasks
```
GET    /api/tasks             All tasks owned by current user
POST   /api/tasks             Create task
PUT    /api/tasks/:id         Update task (title, status, assignee)
DELETE /api/tasks/:id         Delete task
GET    /api/tasks/assigned    Tasks assigned to current user
```

---

## Setup

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

Configure `.env` in `/backend`:
```env
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-secret-key
PORT=5000
```

---

## Project Structure

```
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js           # JWT verification
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   └── App.jsx
    └── vite.config.js
```

---

## Security

- Passwords hashed with bcrypt
- JWT expiry enforced on all protected routes
- Users can only modify their own tasks
- Input validated before DB writes
