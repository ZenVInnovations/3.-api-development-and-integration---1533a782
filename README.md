Task Management App

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for efficient task management with a modern dashboard interface.

<img alt="Task Management Dashboard" src="https://via.placeholder.com/800x400?text=Task+Management+Dashboard">


Features:

1.Create, view, update, and delete tasks
2.Filter and sort tasks
3.User-friendly dashboard with task statistics
4.Responsive design for mobile and desktop
5.Modern UI with Tailwind CSS

Technologies Used:

Frontend: React.js, Tailwind CSS, React Router
Backend: Node.js, Express.js
Database: MongoDB Atlas
Other: RESTful API architecture

Installation:

Prerequisites:
Node.js (v14 or higher)
npm or yarn

Setup Instructions:

1.clone Repo:

git clone https://github.com/ZenVInnovations/3.-api-development-and-integration---1533a782.git
cd 3.-api-development-and-integration---1533a782

2.Backend Setup (API):
# Navigate to the api directory
cd api

# Install dependencies
npm install

# Create .env file and add the following content
echo "PORT=3000
MONGODB_CONN=\"mongodb+srv://taskmanagementRooman:taskmanagementRooman@cluster2.sczmhgb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2\"" > .env

# Start the server
npm start

3.Frontend Setup (Client):
# Open a new terminal and navigate to the client directory
cd ../client

# Install dependencies
npm install

# Start the development server
npm run dev

4.Access the application

Backend API: http://localhost:3000
Frontend: http://localhost:5173

Project Structure:

![alt text](image.png)

API Endpoints:

1.GET /api/task/get-all-task - Get all tasks
2.POST /api/task/create-task - Create new task
3.GET /api/task/get-task/:taskid - Get specific task
4.PUT /api/task/update-task/:taskid - Update task
5.DELETE /api/task/delete-task/:taskid - Delete task

Database:
The application uses a shared MongoDB Atlas database for development purposes. The connection string is already configured in the .env file.

Note: This shared database is for development purposes. For production, it's recommended to use your own MongoDB Atlas instance with proper security measures.

Dashboard
The dashboard provides:
1.Task summary statistics
2.Task listing with filtering options
3.Quick actions for task management
4.Responsive sidebar navigation

Contributors
Adithya L
G Hruthik Reddy
Tejus E
Yashaswini Krishna M

