# Social Media Dashboard

A full-stack application that allows users to submit their social media information and images, with an admin dashboard to view all submissions.

### User submission, Admin and dashboard.
   [Go to admin](#https://social-media-task-five.vercel.app/admin)
   [Go to dashboard](#https://social-media-task-five.vercel.app/dashboard)

#### Admin login username and password - 
    username - satyamJha002
    password - Satyam@123

## Table of Contents
- [Prerequisites](#prerequisites)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (v4.4 or higher)

## Technology Stack
### Frontend
- React.js
- TailwindCSS
  
### Backend
- Node.js
- Express.js
- MongoDB
- Multer (for file uploads)

## Project Structure
```
project-root/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   ├── package.json
│   └── .env
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── uploads/
    ├── server.js
    ├── package.json
    └── .env
```

## Getting Started

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27018/social-media-dashboard
UPLOAD_PATH=./uploads
```

4. Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend application:
```bash
npm start
```

## Running the Application

1. Start MongoDB service on your machine
2. Start the backend server (from backend directory):
```bash
npm run dev
```
3. In a new terminal, start the frontend application (from frontend directory):
```bash
npm start
```
4. Access the application:
   - User submission form: `http://localhost:3000`
   - Admin dashboard: `http://localhost:3000/admin`

## Environment Variables

### Backend
- `PORT`: Server port number (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `UPLOAD_PATH`: Path for storing uploaded images

### Frontend
- `REACT_APP_API_URL`: Backend API URL

## API Endpoints

### User Submissions
- `POST /api/submissions`
  - Submit user data and images
  - Request: multipart/form-data
  - Fields: name, socialHandle, images (multiple files)

### Admin Dashboard
- `GET /api/submissions`
  - Retrieve all submissions
  - Response: Array of user submissions with image URLs

## Notes
- Ensure MongoDB is running before starting the backend server
- The uploads directory will be created automatically in the backend folder
- Maximum file size for image uploads is 5MB per file
