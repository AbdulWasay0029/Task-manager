
# 🚀 Deployment Guide for TaskFlow

This guide will help you put your internship project online for free!

## Option 1: Easy Mode (Vercel + Render)

We will host the Frontend on **Vercel** and the Backend on **Render**.

### Step 1: Push Code to GitHub
1.  Initialize Git in the root folder (where `backend` and `frontend` are):
    ```bash
    git init
    echo "node_modules" > .gitignore
    git add .
    git commit -m "Initial commit"
    ```
2.  Create a new repository on GitHub.
3.  Push your code:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git push -u origin main
    ```

### Step 2: Deploy Backend (Render)
1.  Sign up at [render.com](https://render.com).
2.  Click **"New +"** -> **"Web Service"**.
3.  Connect your GitHub repository.
4.  **Settings**:
    *   **Root Directory**: `backend` (Important!)
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
5.  **Environment Variables** (Click "Advanced"):
    *   `MONGO_URI`: (Paste your MongoDB Atlas string)
    *   `JWT_SECRET`: (Any secret string)
    *   `NODE_ENV`: `production`
6.  Click **Create Web Service**.
7.  Wait for it to deploy. Copy the **URL** (e.g., `https://taskflow-backend.onrender.com`).

### Step 3: Configure Frontend for Production
1.  Open `frontend/src/context/AuthContext.jsx` and `TaskContext.jsx`.
2.  Change `API_URL` from `http://localhost:5000/api` to your Render URL:
    ```javascript
    const API_URL = "https://taskflow-backend.onrender.com/api"; 
    // (Don't forget the /api at the end!)
    ```
3.  Commit and push these changes to GitHub.

### Step 4: Deploy Frontend (Vercel)
1.  Sign up at [vercel.com](https://vercel.com).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository.
4.  **Framework Preset**: Vite
5.  **Root Directory**: Click "Edit" and select `frontend`.
6.  Click **Deploy**.

**🎉 DONE!** Your app is live.

---

## Option 2: Demo Mode (Run Locally)

If you are just showing this on your laptop during a presentation:

1.  **Terminal 1 (Backend)**:
    ```bash
    cd backend
    npm run dev
    ```
2.  **Terminal 2 (Frontend)**:
    ```bash
    cd frontend
    npm run dev
    ```
3.  Open `http://localhost:5173` in your browser.

---

## 🛠 Troubleshooting

*   **CORS Error?** 
    Check `backend/server.js`. Ensure `app.use(cors())` is there. 
    Ideally, restrict it in production:
    ```javascript
    app.use(cors({ origin: 'https://your-vercel-app.vercel.app' }));
    ```

*   **White Screen on Deploy?**
    Check the browser console (F12) for errors. Often it's a mismatched API URL.

Good luck with your internship submission! 🚀
