import { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/authContext";

export default function ManageProfessors() {
  const { user } = useContext(AuthContext);
  const [professors, setProfessors] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchProfessors();
    fetchDepartments();
  }, []);

  const fetchProfessors = async () => {
    const res = await api.get("/professors");
    setProfessors(res.data);
  };

  const fetchDepartments = async () => {
    const res = await api.get("/departments");
    setDepartments(res.data);
  };

  const handleAdd = async () => {
    try {
      await api.post("/professors", {
        name,
        email,
        departmentCode,
      });
      setName("");
      setEmail("");
      setDepartmentCode("");
      fetchProfessors();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/professors/${id}`);
      fetchProfessors();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <Layout>
        <div className="text-center text-red-600 font-bold mt-10 text-xl">
          Unauthorized – Admins only
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Manage Professors</h1>

        <div className="grid gap-2 mb-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Professor Name"
            className="border p-2 rounded"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border p-2 rounded"
          />
          <select
            value={departmentCode}
            onChange={(e) => setDepartmentCode(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.code}>
                {dept.name} ({dept.code})
              </option>
            ))}
          </select>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Professor
          </button>
        </div>

        <ul className="space-y-3">
          {professors.map((prof) => (
            <li
              key={prof.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-bold text-blue-700">{prof.name}</p>
                <p className="text-sm text-gray-600">{prof.email}</p>
              </div>
              <button
                onClick={() => handleDelete(prof.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
