import { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/authContext";

export default function ManageCourses() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [professors, setProfessors] = useState([]);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [professorEmail, setProfessorEmail] = useState("");
  const [courseType, setCourseType] = useState("");
  const [offeredIn, setOfferedIn] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [filterDept, setFilterDept] = useState("");
  const [filterSemester, setFilterSemester] = useState("");

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

  const filteredCourses = courses
    .filter(
      (course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((c) => (filterDept ? c.department.code === filterDept : true))
    .filter((c) => (filterSemester ? c.offeredIn.includes(filterSemester) : true))
    .sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "rating") return (b.ratings?.overall || 0) - (a.ratings?.overall || 0);
      return 0;
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
      <div className="p-6 max-w-6xl mx-auto">
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

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name/code"
            className="border p-2 rounded w-48"
          />
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.code} value={dept.code}>
                {dept.name}
              </option>
            ))}
          </select>
          <select
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Semesters</option>
            <option value="monsoon">Monsoon</option>
            <option value="winter">Winter</option>
          </select>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="name">Sort by Name</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>

        {/* Course Cards */}
        <div className="flex flex-wrap gap-4">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white w-full md:w-[48%] lg:w-[32%] p-4 rounded shadow border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-blue-700 mb-1">
                  {course.name} ({course.code})
                </h3>
                <p className="text-sm text-gray-700 mb-1">
                  Type: {course.courseType} | Sem: {course.offeredIn.join(", ")}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  Dept: {course.department?.name}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  Prof: {course.professor?.name}
                </p>
                {course.ratings && (
                  <div className="text-xs text-gray-600 mt-2 space-y-1">
                    <p>Overall: {course.ratings.overall.toFixed(2)}</p>
                    <p>Attendance: {course.ratings.attendance.toFixed(2)}</p>
                    <p>Grading: {course.ratings.grading.toFixed(2)}</p>
                    <p>Material: {course.ratings.material.toFixed(2)}</p>
                    <p>Professor: {course.ratings.prof.toFixed(2)}</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => handleDelete(course.id)}
                className="mt-3 self-end text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
