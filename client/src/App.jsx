import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import AuthProvider from "./context/authContext.jsx";
import CourseList from "./pages/CourseList.jsx";
import Departments from "./pages/Departments";
import DepartmentCourses from "./pages/DepartmentCourses";
import Professors from "./pages/Professors";
import CourseDetail from "./pages/CourseDetails.jsx";
import Landing from "./pages/Landing.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/departments/:code" element={<DepartmentCourses />} />
          <Route path="/professors" element={<Professors />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
