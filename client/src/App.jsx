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
import AdminControls from "./pages/admin/AdminControls.jsx";
import ManageCourses from "./pages/admin/ManageCourses.jsx";
import ManageProfessors from "./pages/admin/ManageProfessors.jsx";
import ManageDepartments from "./pages/admin/ManageDepartments.jsx";
import AddReviewPage from "./pages/AddReviewPage";
import SelectReviewCourse from "./pages/SelectReviewCourse";
import MyReviews from "./pages/MyReviews";
import About from "./pages/info/AboutUs.jsx";
import ContactUs from "./pages/info/ContactUs.jsx";
import Pricing from "./pages/info/Pricing.jsx";
import PrivacyPolicy from "./pages/info/PrivacyPolicy.jsx";
import TermsAndConditions from "./pages/info/Terms&Conditions.jsx";
import RefundPolicy from "./pages/info/CancellationRefundPolicy.jsx";


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
          <Route path="/admin" element={<AdminControls />} />
          <Route path="/admin/courses" element={<ManageCourses />} />
          <Route path="/admin/professors" element={<ManageProfessors />} />
          <Route path="/admin/departments" element={<ManageDepartments />} />
          <Route path="/courses/:id/add-review" element={<AddReviewPage />} />
          <Route path="/select-review-course" element={<SelectReviewCourse />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/my-reviews" element={<MyReviews />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
