import { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/authContext";

export default function ManageCourses() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [professors, setProfessors] = useState([]);

  // Form fields
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [professorEmail, setProfessorEmail] = useState("");
  const [courseType, setCourseType] = useState("");
  const [offeredIn, setOfferedIn] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchDepartments();
    fetchProfessors();
  }, []);

  const fetchCourses = async () => {
    const res = await api.get("/courses");
    setCourses(res.data);
  };

  const fetchDepartments = async () => {
    const res = await api.get("/departments");
    setDepartments(res.data);
  };

  const fetchProfessors = async () => {
    const res = await api.get("/professors");
    setProfessors(res.data);
  };

  const handleAdd = async () => {
    try {
      await api.post("/courses", {
        name,
        code,
        departmentCode,
        professorEmail,
        courseType,
        offeredIn,
      });

      // Reset form
      setName("");
      setCode("");
      setDepartmentCode("");
      setProfessorEmail("");
      setCourseType("");
      setOfferedIn([]);

      fetchCourses();
    } catch (err) {
      console.error("Failed to add course", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/courses/${id}`);
      fetchCourses();
    } catch (err) {
      console.error("Failed to delete course", err);
    }
  };

  const toggleSemester = (sem) => {
    setOfferedIn((prev) =>
      prev.includes(sem) ? prev.filter((s) => s !== sem) : [...prev, sem]
    );
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
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Manage Courses</h1>

        {/* Add Course Form */}
        <div className="grid gap-3 mb-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Course Name"
            className="border p-2 rounded"
          />
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Course Code"
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
          <select
            value={professorEmail}
            onChange={(e) => setProfessorEmail(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Professor</option>
            {professors.map((prof) => (
              <option key={prof.id} value={prof.email}>
                {prof.name} ({prof.email})
              </option>
            ))}
          </select>
          <input
            value={courseType}
            onChange={(e) => setCourseType(e.target.value)}
            placeholder="Course Type (e.g., OE, DE, ESO)"
            className="border p-2 rounded"
          />
          <div className="flex gap-4">
            <label>
              <input
                type="checkbox"
                checked={offeredIn.includes("monsoon")}
                onChange={() => toggleSemester("monsoon")}
              />{" "}
              Monsoon
            </label>
            <label>
              <input
                type="checkbox"
                checked={offeredIn.includes("winter")}
                onChange={() => toggleSemester("winter")}
              />{" "}
              Winter
            </label>
          </div>

          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Course
          </button>
        </div>

        {/* Existing Courses List */}
        <ul className="space-y-3">
          {courses.map((course) => (
            <li
              key={course.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-bold text-blue-700">
                  {course.name} ({course.code})
                </p>
                <p className="text-sm text-gray-600">
                  {course.courseType} • {course.offeredIn?.join(", ")}
                </p>
              </div>
              <button
                onClick={() => handleDelete(course.id)}
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
