// client/src/pages/Home.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("overall");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to load courses", err);
      }
    };
    fetchCourses();
  }, []);
  const navigate = useNavigate();

  const getRating = (course) => {
    return course.ratings?.[filter] || 0;
  };

  const sorted = [...courses].sort((a, b) => getRating(b) - getRating(a));

  return (
    <Layout>
      <div className="p-4">
        {/* Filter Header */}
        <div className="mb-4">
          <label className="mr-2 font-medium">Sort by:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-1 border rounded"
          >
            <option value="overall">Overall</option>
            <option value="attendance">Attendance</option>
            <option value="grading">Grading</option>
            <option value="material">Material</option>
            <option value="prof">Professor</option>
          </select>
        </div>

        {/* Course List */}
        <div className="grid gap-4">
          {sorted.map((course, i) => (
            <div key={course.id} className="bg-white p-4 shadow rounded">
              <h2
                className="text-xl font-bold text-blue-700 cursor-pointer"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                #{i + 1} – {course.name}
              </h2>

              <p className="text-sm text-gray-700">
                Professor: {course.professor.name}
              </p>
              <p className="text-sm text-gray-700">
                Dept: {course.department.name}
              </p>
              {course.ratings && (
                <ul className="text-sm mt-2">
                  <li>Overall: {course.ratings.overall.toFixed(2)}</li>
                  <li>Attendance: {course.ratings.attendance.toFixed(2)}</li>
                  <li>Grading: {course.ratings.grading.toFixed(2)}</li>
                  <li>Material: {course.ratings.material.toFixed(2)}</li>
                  <li>Professor: {course.ratings.prof.toFixed(2)}</li>
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
