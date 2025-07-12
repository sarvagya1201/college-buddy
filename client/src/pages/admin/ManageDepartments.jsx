import { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/authContext";

export default function ManageDepartments() {
  const { user } = useContext(AuthContext);
  const [departments, setDepartments] = useState([]);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const [editingDeptId, setEditingDeptId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const res = await api.get("/departments");
    setDepartments(res.data);
  };

  const handleAdd = async () => {
    try {
      await api.post("/departments", { name, code });
      setName("");
      setCode("");
      fetchDepartments();
    } catch (err) {
      console.error("Error adding department:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/departments/${id}`);
      fetchDepartments();
    } catch (err) {
      console.error("Error deleting department:", err);
    }
  };

  const handleEdit = (dept) => {
    setEditingDeptId(dept.id);
    setEditName(dept.name);
    setEditCode(dept.code);
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/departments/${editingDeptId}`, {
        name: editName,
        code: editCode,
      });
      setEditingDeptId(null);
      fetchDepartments();
    } catch (err) {
      console.error("Error updating department:", err);
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
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Manage Departments
        </h1>

        {/* Add Form */}
        <div className="grid gap-3 mb-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Department Name"
            className="border p-2 rounded"
          />
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Department Code"
            className="border p-2 rounded"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Department
          </button>
        </div>

        {/* List */}
        <ul className="space-y-3">
          {departments.map((dept) => (
            <li
              key={dept.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              {editingDeptId === dept.id ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full justify-between">
                  <input
                    className="border p-1 rounded"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <input
                    className="border p-1 rounded"
                    value={editCode}
                    onChange={(e) => setEditCode(e.target.value)}
                  />
                  <button
                    onClick={handleUpdate}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingDeptId(null)}
                    className="text-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
                  <div>
                    <p className="font-bold text-blue-700">{dept.name}</p>
                    <p className="text-sm text-gray-600">Code: {dept.code}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(dept)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(dept.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
