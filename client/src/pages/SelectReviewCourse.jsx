// src/pages/SelectReviewCourse.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";

export default function SelectReviewCourse() {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/departments").then((res) => setDepartments(res.data));
  }, []);

  useEffect(() => {
    if (selectedDept) {
      api.get(`/departments/${selectedDept}/courses`).then((res) =>
        setCourses(res.data)
      );
    }
  }, [selectedDept]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCourse) {
      navigate(`/courses/${selectedCourse}/add-review`);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Add a Review</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.code} value={dept.code}>
                {dept.name}
              </option>
            ))}
          </select>

          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full p-2 border rounded"
            required
            disabled={!courses.length}
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name} ({course.code})
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Continue to Review
          </button>
        </form>
      </div>
    </Layout>
  );
}
