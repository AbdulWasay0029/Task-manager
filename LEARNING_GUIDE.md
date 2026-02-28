# TaskFlow Recreation Guide
THIS IS YOUR INSTRUCTION MANUAL. Follow it step-by-step to recreate the project yourself.

## Part 1: Backend Setup (Node.js + Express)

We are building the server first. The server handles "requests" from the frontend (React) and talks to the database (MongoDB).

### Step 1.1: Initialize Project
Open your terminal in the project folder and run:
`npm init -y`
(This creates a `package.json` file which tracks our project settings and dependencies)

### Step 1.2: Install Dependencies
We need these specific tools:
- **express**: The web framework for Node.js (makes building APIs easy).
- **mongoose**: To talk to MongoDB database.
- **dotenv**: To hide secrets (like database passwords) in a `.env` file.
- **cors**: To allow our React frontend to talk to this backend.
- **jsonwebtoken**: For secure user login (auth).
- **bcryptjs**: To scramble passwords so they aren't saved as plain text.

Run this command:
`npm install express mongoose dotenv cors jsonwebtoken bcryptjs`

And for development (so server restarts when we save files):
`npm install -D nodemon`

### Step 1.3: Create File Structure
Organize your backend so it's clean:
- `controllers/`: Logic for what happens when a route is hit (e.g., "registerUser").
- `models/`: Database schemas (what a "User" or "Task" looks like).
- `routes/`: API endpoints (e.g., `/api/login`).
- `middleware/`: Code that runs *before* the controller (e.g., check if user is logged in).
- `server.js`: The entry point that starts everything.
- `.env`: Secret variables.

### Step 1.4: The Server Entry Point (server.js)
This file starts the express app, connects to DB, and listens for requests.
See `backend/server.js` for the commented code.

### Step 1.5: Configure Scripts
In `package.json`, we updated the `scripts` section:
- `"start": "node server.js"` (for production)
- `"dev": "nodemon server.js"` (for development - auto restarts)

### Step 1.6: Run the Server
Run this command in the `backend` folder:
`npm run dev`

**Troubleshooting:**
If you see "MongoDB Connected", great!
If you see "Error: ...", ensure your MongoDB is running locally or check your `.env` string.

## Part 2: MongoDB Models (The Database Blueprint)
Models define what our data looks like. Mongoose enforces this structure.

### Step 2.1: User Model (models/User.js)
We need to store users.
- **Fields**: Name, Email (must be unique), Password (hashed).
- **Timestamps**: Automatically tracks when created/updated.

See `backend/models/User.js` for the code.

### Step 2.2: Task Model (models/Task.js)
We need to store tasks and who they belong to.
- **createdBy**: This is a relational link! It stores the `_id` of the User who created it.
- **assignedTo**: Another link to a User (optional).
- **status**: We restrict this to only allow 'pending' or 'completed'.

See `backend/models/Task.js` for the code.

## Part 3: Authentication (Secure Login)
This is the most complex part of the backend.

### Step 3.1: The Controller (controllers/authController.js)
This file handles the logic:
- **Register**: Checks if user exists -> Hashes password (bcrypt) -> Creates user in DB -> Returns a Token.
- **Login**: Finds user -> Compares password (bcrypt) -> Returns a Token.
- **Generate Token**: Uses `jsonwebtoken` to create a secure key card for the user.

### Step 3.2: Middleware (middleware/authMiddleware.js)
This "guards" your routes. It checks if the request has a valid Token in the header.
If yes, it adds the User to the request (`req.user`). If no, it blocks access.

### Step 3.3: Routes (routes/authRoutes.js)
This defines the URL endpoints:
- POST `/register`
- POST `/login`
- GET `/me` (Protected by middleware)

### Step 3.4: Connect to Server (server.js)
We added `app.use('/api', require('./routes/authRoutes'))` to `server.js`.
This makes our routes live at `/api/register` and `/api/login`.

## Part 4: Task Logic (CRUD)

### Step 4.1: The Controller (controllers/taskController.js)
We implemented "Create, Read, Update, Delete" (CRUD) logic.
- **getMyTasks**: Finds all tasks where `createdBy` matches the logged-in user's ID.
- **createTask**: Saves a new task. Checks if an `assignedToEmail` was provided and looks up that user.
- **updateTask/deleteTask**: Crucial security step! We check `if (task.createdBy !== req.user.id)` to prevent users from messing with others' tasks.

### Step 4.2: Routes (routes/taskRoutes.js)
We defined endpoint URLs and protected ALL of them with `protect` middleware.
- `/api/tasks/my`
- `/api/tasks/create`
- ...and so on.

### Step 4.3: Connect to Server
We added `app.use('/api/tasks', require('./routes/taskRoutes'))` to `server.js`.

## Part 5: Testing & Database Setup (CRITICAL)

### Step 5.1: Install MongoDB
Since the tests failed, create a MongoDB instance:
1.  **Option A (Recommended): MongoDB Atlas (Cloud)**
    - Sign up at mongodb.com
    - Create a free cluster.
    - Click "Connect" -> "Drivers" -> Copy the string (e.g., `mongodb+srv://<user>:<password>@cluster0.mongodb.net/...`).
    - Replace `MONGO_URI` in `.env` with this string.
2.  **Option B: Local Install**
    - Install MongoDB Community Server.
    - Ensure it is running as a service.

### Step 5.2: Run Tests
Run `node test-backend.js` to verify connection and logic.

## Part 6: Frontend Setup (React + Tailwind)

### Step 6.1: Initialize Frontend
We use Vite for a fast React setup. Run this in the ROOT folder:
`npm create vite@latest frontend --template react`

### Step 6.2: Install Dependencies
Go into the `frontend` folder (`cd frontend`) and run:
`npm install`
`npm install -D tailwindcss postcss autoprefixer`
`npm install react-router-dom axios react-icons react-toastify`

### Step 6.3: Configure Tailwind
1. Run `npx tailwindcss init -p` to create config files.
2. Edit `tailwind.config.js` to tell it where to look for style classes:
   ```javascript
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   ```
3. Add Tailwind directives to `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

### Step 6.4: Clean Up & Organize
1. We deleted the default `App.css` and `App.jsx` content.
2. We created folders: `components`, `pages`, `context`.
3. We created a simple "Hello World" in `App.jsx` to test if Tailwind works.

### Step 6.5: Run Frontend
Run `npm run dev` in the `frontend` folder to start the UI.
