
# College Buddy

A full-stack web platform designed to help students review courses, rate professors, and share academic notes. Built with a modern tech stack including React, Node.js, PostgreSQL, and Prisma.

## Table of Contents
- 🌟 [Live Demo](#live-demo)
- 🏛️ [System Architecture Diagram](#system-architecture-diagram)
- 📌 [Features](#features)
- 💻 [Tech Stack](#tech-stack)
  - 🎨 [Frontend](#frontend)
  - ⚙️ [Backend](#backend)
  - 🗃️ [Database](#database)
  - ☁️ [Cloud Services](#cloud-services)
- 📂 [Folder Structure](#folder-structure)
- 🚀 [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone the Repo](#clone-the-repo)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- 🔑 [Environment Variables](#environment-variables)

## 🌟 Live Demo

[Link to Deployed Application](https://college-buddy-pi.vercel.app/)

## 🏛️ System Architecture Diagram

![System Architecture](path-to-your-architecture-image.png)

## 📌 Features

### For Students:
- **🔐 Authentication**: Secure user registration and login system using JWT.
- **📚 Course & Professor Directory**: Browse and search for courses, departments, and professors.
- **⭐️ Reviews & Ratings**: Submit, view, and update detailed course reviews with ratings for material, grading, professor, and attendance.
- **📝 Notes Sharing**: Upload course-specific notes and view/download materials shared by peers.
- **👤 User Dashboard**: View your profile information and manage your submitted reviews.

### For Admins:
- **🛡️ Admin Panel**: A protected, role-based admin panel to manage the platform's data.
- **🛠️ Data Management**: Full CRUD (Create, Read, Update, Delete) functionality for courses, departments, and professors.
- **📊 Bulk Data Upload**: An interface to upload course, professor, and department data in bulk from an Excel sheet.

## 💻 Tech Stack

### 🎨 Frontend:
- **Framework**: React.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Context API
- **HTTP Client**: Axios

### ⚙️ Backend:
- **Framework**: Node.js, Express.js
- **Authentication**: JSON Web Tokens (JWT), Bcrypt
- **File Handling**: Multer for multipart/form-data

### 🗃️ Database:
- **Database**: PostgreSQL
- **ORM**: Prisma

### ☁️ Cloud Services:
- **File Storage**: Supabase Storage for notes and other user-uploaded files.

## 📂 Folder Structure

The project is organized in a monorepo structure with two main directories: `client` and `server`.

```
.
├── client/         # Contains the React frontend application
│   ├── public/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── App.jsx
└── server/         # Contains the Node.js backend server
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── prisma/
    │   └── schema.prisma
    └── app.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm / yarn
- PostgreSQL database instance
- A Supabase account for file storage

### 1️⃣ Clone the Repo
```bash
git clone https://github.com/your-username/college-buddy.git
cd college-buddy
```

### 2️⃣ Backend Setup
Navigate to the `server` directory:
```bash
cd server
```
Install dependencies:
```bash
npm install
```
Set up your environment variables by creating a `.env` file and filling it based on `.env.sample`. See the Environment Variables section for details.

Apply the database schema using Prisma:
```bash
npx prisma migrate dev
```
Start the backend server:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
Open a new terminal and navigate to the `client` directory:
```bash
cd client
```
Install dependencies:
```bash
npm install
```
Create a `.env` file in the client root and add your backend API URL:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
```
The application should now be running on your local machine!

## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the `server` directory.

| Variable                           | Description                                                     | Example Value                                        |
|-------------------------------------|-----------------------------------------------------------------|------------------------------------------------------|
| `DATABASE_URL`                      | Your PostgreSQL database connection string.                    | `postgresql://user:password@localhost:5432/mydb`      |
| `JWT_SECRET`                        | A secret key for signing JWTs.                                 | `your-super-secret-key`                              |
| `CORS_ORIGIN`                       | The URL of your frontend application.                          | `http://localhost:5173`                              |
| `SUPABASE_URL`                      | The URL for your Supabase project.                             | `https://xyz.supabase.co`                             |
| `SUPABASE_SERVICE_ROLE_KEY`         | The service role key for your Supabase project.                 | `your-supabase-service-key`                          |

---

Feel free to customize the placeholders, such as the live demo link, system architecture image, and repo URL, according to your project details.
