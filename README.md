```markdown

# Brief Summary

This project demonstrates the fundamentals of API development and
 integration using Node.js and Express. It includes a basic setup for
  building and testing RESTful APIs, managing routes, handling 
  requests/responses, and integrating with external services. Designed as
   part of a learning module, this repository serves as a foundational
    example for beginners looking to understand how to create and connect
     APIs in a real-world backend environment.


# Task Management App 📋

A full-stack MERN application featuring a modern dashboard interface for efficient task management.

![Task Management Dashboard](https://via.placeholder.com/800x400?text=Task+Management+Dashboard)

## ✨ Features
- **CRUD Operations**: Create, Read, Update, and Delete tasks
- **Advanced Filtering**: Sort and filter tasks by status, priority, and due date
- **Analytics Dashboard**: Visual task statistics and progress tracking
- **Responsive Design**: Optimized for all screen sizes
- **Modern UI**: Built with Tailwind CSS for sleek aesthetics

## 🛠️ Tech Stack
**Frontend:**  
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)  
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

**Backend:**  
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)  
![Express.js](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white)

**Database:**  
![MongoDB Atlas](https://img.shields.io/badge/-MongoDB_Atlas-47A248?logo=mongodb&logoColor=white)

## 🚀 Installation

### Prerequisites
- Node.js v14+
- npm or yarn
- MongoDB Atlas account (optional)

### Backend Setup
```bash
# Clone repository
git clone https://github.com/ZenVInnovations/3.-api-development-and-integration---1533a782.git
cd 3.-api-development-and-integration---1533a782/api

# Install dependencies
npm install

# Configure environment
echo "PORT=3000
MONGODB_CONN=\"mongodb+srv://taskmanagementRooman:taskmanagementRooman@cluster2.sczmhgb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2\"" > .env

# Start server
npm start
```

### Frontend Setup
```bash
cd ../client
npm install
npm run dev
```

## 🌐 Access Points
- **Backend API**: http://localhost:3000
- **Frontend App**: http://localhost:5173

# Example API Calls

1. To get all users:
    curl http://localhost:3000/users

   Expected response:
    [
  {
    "id": 1,
    "name": "John Doe"
  },
  ...
]


## 🔌 API Endpoints
| Method | Endpoint                  | Description                 |
|--------|---------------------------|-----------------------------|
| GET    | /api/task/get-all-task    | Retrieve all tasks          |
| POST   | /api/task/create-task     | Create new task             |
| GET    | /api/task/get-task/:taskid| Get specific task           |
| PUT    | /api/task/update-task/:taskid| Update task              |
| DELETE | /api/task/delete-task/:taskid| Delete task              |

## 📊 Database Configuration
Utilizes a shared MongoDB Atlas cluster for development:
```env
MONGODB_CONN="mongodb+srv://taskmanagementRooman:taskmanagementRooman@cluster2.sczmhgb.mongodb.net/"
```

> **Important Note**  
> This shared database is for demonstration purposes only. For production use, create your own MongoDB Atlas instance with proper security measures.

## 📈 Dashboard Features
- Real-time task statistics
- Interactive filtering system
- Quick-action task controls
- Mobile-optimized navigation
- Visual progress indicators

## 🧑💻 Contributors
- Adithya L
- G Hruthik Reddy  
- Tejus E
- Yashaswini Krishna M

---
