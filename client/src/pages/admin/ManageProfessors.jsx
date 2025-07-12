import { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/authContext";

export default function ManageProfessors() {
  const { user } = useContext(AuthContext);
  const [professors, setProfessors] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProfessors();
    fetchDepartments();
  }, []);

  const fetchProfessors = async () => {
    try {
      const res = await api.get("/professors");
      setProfessors(res.data);
    } catch (err) {
      console.error("Error fetching professors", err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/departments");
      setDepartments(res.data);
    } catch (err) {
      console.error("Error fetching departments", err);
    }
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
      console.error("Error adding professor", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/professors/${id}`);
      fetchProfessors();
    } catch (err) {
      console.error("Error deleting professor", err);
    }
  };

  const filteredProfessors = professors.filter((prof) => {
    const q = searchQuery.toLowerCase();
    return (
      prof.name.toLowerCase().includes(q) ||
      prof.email.toLowerCase().includes(q) ||
      prof.department?.name?.toLowerCase().includes(q) ||
      prof.department?.code?.toLowerCase().includes(q)
    );
  });

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
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Manage Professors
        </h1>

        {/* Add Professor Form */}
        <div className="grid gap-3 mb-6">
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

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or department..."
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Professors List */}
        <div className="space-y-3">
          {filteredProfessors.length === 0 ? (
            <p className="text-gray-500 text-sm">No professors found.</p>
          ) : (
            filteredProfessors.map((prof) => (
              <div
                key={prof.id}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-bold text-blue-700">{prof.name}</p>
                  <p className="text-sm text-gray-600">{prof.email}</p>
                  <p className="text-sm text-gray-500">
                    Department: {prof.department?.name} ({prof.department?.code})
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(prof.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}