import { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/authContext";

export default function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const { user } = useContext(AuthContext);

  const fetchDepartments = async () => {
    const res = await api.get("/departments");
    setDepartments(res.data);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAdd = async () => {
    try {
      await api.post("/departments", { name, code });
      setName("");
      setCode("");
      fetchDepartments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/departments/${id}`);
      fetchDepartments();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <Layout>
        <p className="text-center mt-10 text-red-600 font-bold text-xl">
          Unauthorized – Admins only
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Manage Departments</h1>

        <div className="grid gap-2 mb-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Department Name"
            className="border p-2 rounded"
          />
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code (e.g., ECE)"
            className="border p-2 rounded"
          />
          <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {departments.map((dept) => (
            <li
              key={dept.id}
              className="bg-white p-3 rounded shadow flex justify-between items-center"
            >
              <span className="font-semibold">
                {dept.name} ({dept.code})
              </span>
              <button
                onClick={() => handleDelete(dept.id)}
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
