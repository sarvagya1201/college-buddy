// client/src/pages/DepartmentCourses.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

export default function DepartmentCourses() {
  const { code } = useParams();
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await api.get(`/courses?dept=${code}`);
      setCourses(res.data);
    };
    fetchCourses();
  }, [code]);

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Courses in {code}</h1>
        <div className="grid gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-4 shadow rounded">
              <h2
                className="text-lg font-bold text-blue-700 cursor-pointer"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                {course.name}
              </h2>
              <p className="text-sm text-gray-700">
                Professor: {course.professor.name}
              </p>
              <p className="text-sm text-gray-700">
                Dept: {course.department.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
