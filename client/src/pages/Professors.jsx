import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

export default function Professors() {
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    const fetchProfs = async () => {
      const res = await api.get("/professors");
      setProfessors(res.data);
    };
    fetchProfs();
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">All Professors</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {professors.map((prof) => (
            <div key={prof.id} className="bg-white p-4 shadow rounded">
              <h2 className="text-lg font-semibold text-blue-700">{prof.name}</h2>
              <p className="text-sm text-gray-600">{prof.email}</p>
              <p className="text-sm text-gray-600">Dept: {prof.department.name}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}