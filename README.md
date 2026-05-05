# Team Task Manager

**Live Demo**:
- Backend API (Render): https://task-manager-bgdk.onrender.com

A full-stack project management application with role-based access control, allowing admins to create projects and assign tasks, while members can track and update their progress.

## Tech Stack
- **Frontend**: React (Vite), React Router, Lucide-React for icons, Custom CSS (Glassmorphism).
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT for secure authentication, bcryptjs for password hashing.

## Features
- **Authentication**: Secure Signup/Login with JWT.
- **Roles**: Admin vs. Member permissions. Admins can create and delete tasks/projects; Members can only view and update their own assigned tasks.
- **Dashboard**: Real-time statistics showing Total, In Progress, Completed, and Overdue tasks.
- **Task Management**: Clear logical buttons to Start Progress or Complete a Task with visual confirmations.

## Local Setup

### 1. Database
Create a MongoDB Atlas cluster and get the connection string. Add it to a `.env` file in the `server` folder:
```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 2. Run Backend
```bash
cd server
npm install
npm run dev
```

### 3. Run Frontend
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```

## Deployment on Vercel
1. Upload the repository to GitHub.
2. Go to Vercel and import the repository.
3. Vercel will likely ask you to deploy the `client` folder.
4. Set the Framework Preset to `Vite`.
5. For the backend, you can deploy the `server` folder to a service like Render or set up a custom `vercel.json` if deploying as Vercel serverless functions.
6. Make sure to add `VITE_API_URL` to your Vercel Environment Variables if you are hosting the backend elsewhere.
