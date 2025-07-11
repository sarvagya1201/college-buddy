import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

export default function AdminControls() {
  const { user } = useContext(AuthContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/"); // redirect if not admin
    }
  }, [user]);

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Admin Controls
        </h1>

        <div className="grid gap-6 md:grid-cols-3">
          <div
            className="bg-white p-4 rounded shadow cursor-pointer hover:bg-blue-50"
            onClick={() => navigate("/admin/departments")}
          >
            <h2 className="text-lg font-semibold text-blue-700">Manage Departments</h2>
            <p className="text-sm text-gray-600">Add, update, or delete departments.</p>
          </div>
          <div
            className="bg-white p-4 rounded shadow cursor-pointer hover:bg-blue-50"
            onClick={() => navigate("/admin/professors")}
          >
            <h2 className="text-lg font-semibold text-blue-700">Manage Professors</h2>
            <p className="text-sm text-gray-600">Edit professor data easily.</p>
          </div>
          <div
            className="bg-white p-4 rounded shadow cursor-pointer hover:bg-blue-50"
            onClick={() => navigate("/admin/courses")}
          >
            <h2 className="text-lg font-semibold text-blue-700">Manage Courses</h2>
            <p className="text-sm text-gray-600">Create and update courses offered.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
