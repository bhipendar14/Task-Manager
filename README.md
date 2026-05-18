# Team Task Manager

A full-stack, responsive project management application with role-based access control. Admins can create projects and assign tasks, while members can track and update their progress. Built with a modern glassmorphism UI.

## 🚀 Live Demo

- **Frontend (Vercel)**: [https://task-manager-demo-bh.vercel.app/](https://task-manager-demo-bh.vercel.app/)
- **Backend API (Render)**: [https://task-manager-bgdk.onrender.com](https://task-manager-bgdk.onrender.com)

### Demo Credentials

Feel free to use the demo credentials below to test the application, or simply click the quick login buttons on the login page:

**Admin Account:**
- **Email:** `bhipendarkumar31@gmail.com`
- **Password:** `haru0314`

**Employee Account:**
- **Email:** `rahul@gmail.com`
- **Password:** `haru0314`

## 🛠️ Tech Stack

- **Frontend**: React (Vite), React Router, Lucide-React for icons, Custom CSS (Glassmorphism).
- **Backend**: Node.js, Express.js, MongoDB (Mongoose).
- **Security**: JWT for secure authentication, bcryptjs for password hashing.
- **Deployment**: Vercel (Frontend), Render (Backend).

## ✨ Features

- **Authentication**: Secure Signup/Login with JWT-based session management.
- **Role-Based Access Control**:
  - **Admins**: Can create/delete tasks and projects, assign tasks to members, and view overall progress.
  - **Members**: Can view their assigned tasks and update task status (To Do -> In Progress -> Completed).
- **Interactive Dashboard**: Real-time statistics showing Total, In Progress, Completed, and Overdue tasks.
- **Modern UI**: Clean, glassmorphism-inspired design with responsive layout and visual feedback.

## 💻 Local Setup Instructions

### 1. Database Configuration
Create a MongoDB Atlas cluster and get your connection string. Add it to a `.env` file in the `server` folder along with a secret key:
```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 2. Backend Setup
Open a terminal and run the following commands:
```bash
cd server
npm install
npm run dev
```
The server will start on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal window:
```bash
cd client
npm install
# Optional: Set VITE_API_URL in a .env file to point to your local/remote backend
npm run dev
```
The client will start on `http://localhost:5173`.

## 🌐 Deployment Details
- The backend is deployed on Render and exposes RESTful API endpoints.
- The frontend is deployed on Vercel as a Vite SPA.
- CORS is configured to allow secure communication between the frontend and backend.
