// client/src/pages/Dashboard.jsx
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  if (!user)
    return <p className="mt-24 text-center">Loading profile…</p>;

  return (
    <section className="flex flex-col items-center mt-24 gap-4">
      <h1 className="text-3xl font-bold">Welcome, {user.name} 👋</h1>
      <div className="bg-gray-100 p-4 rounded shadow w-80">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      {/* 🔜 future feature */}
      <button
        onClick={() => window.location.href = "/my-reviews"}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        My Reviews
      </button>
    </section>
  );
}
