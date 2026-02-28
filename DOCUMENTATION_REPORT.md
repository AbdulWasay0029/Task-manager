# TaskFlow Project Documentation Report

## 1. Project Overview
*   **Project Name**: TaskFlow
*   **Domain**: Full-Stack Development
*   **Purpose**: A comprehensive task management application designed to solve team collaboration and task tracking issues.
*   **Features**: User authentication, task CRUD operations, assignment to other users, real-time updates via WebSockets, and dashboard filtering.

## 2. Problem Statement Addressed
"A company struggles with task management and collaboration among team members. The current system lacks user-friendly interfaces and efficient task tracking."
**Solution**: TaskFlow provides an intuitive dashboard separating "My Tasks" from "Assigned Tasks," protected by JWT authentication, and instantly updates when tasks change using Socket.io.

## 3. Technology Stack Stack
*   **Frontend**: React (Vite), TailwindCSS, React-Router-DOM, Axios, Socket.io-client.
*   **Backend**: Node.js, Express.js, Socket.io (WebSockets).
*   **Database**: MongoDB (Mongoose ORM).
*   **Authentication**: JSON Web Tokens (JWT) & bcryptjs.

## 4. Key Objectives Achieved

### Objective 1: User Authentication and Authorization
*   Implemented strict registration and login flows.
*   Passwords are encrypted using `bcryptjs` before reaching the database.
*   Protected routes ensure only authenticated users with valid JWT tokens can access or modify tasks.

### Objective 2: Task Features (Creating, Assigning, Tracking)
*   Users can create tasks with titles and descriptions.
*   Tasks can be explicitly assigned to another registered user using their email address.
*   The dashboard dynamically filters tasks by 'Pending' or 'Completed' status.
*   Users can mark tasks they created, or tasks assigned to them, as complete.

### Objective 3: Real-Time Collaboration
*   Integrated **WebSockets (Socket.io)**.
*   When User A assigns a task to User B, User B receives a real-time notification (using `react-toastify`) and their dashboard updates instantly without page refresh.
*   When a status is toggled, all relevant parties see the update instantly.

## 5. System Architecture
1.  **Client-Side**: React provides a single-page application (SPA) experience. `AuthContext` manages global login state. `TaskContext` manages data fetching and socket connections.
2.  **Server-Side**: Express handles REST API endpoints (`/api/register`, `/api/tasks/create`, etc.).
3.  **Real-Time Layer**: HTTP Server wrapped by Socket.io maintains active connections, assigning users to private "rooms" based on their MongoDB `_id` to route messages securely.

## 6. Project Setup Instructions
(See `README.md` and `LEARNING_GUIDE.md` in the project root for detailed recreation steps).
1. `cd backend` -> `npm install` -> `npm run dev`
2. `cd frontend` -> `npm install` -> `npm run dev`

## 7. Dummy Data Disclaimer
As per internship guidelines, dummy data (test emails, sample task titles) were used during the testing and development phase of this project to verify logic.

---
*End of Report*
