// client/src/pages/Departments.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await api.get("/departments");
      setDepartments(res.data);
    };
    fetchDepartments();
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">All Departments</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {departments.map((dept) => (
            <div
              key={dept.code}
              onClick={() => navigate(`/departments/${dept.code}`)}
              className="cursor-pointer bg-white p-4 rounded shadow hover:shadow-md border"
            >
              <h2 className="text-lg font-semibold text-blue-700">{dept.name}</h2>
              <p className="text-sm text-gray-600">Code: {dept.code}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
