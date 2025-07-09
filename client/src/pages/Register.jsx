// client/src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      await api.post("/auth/register", form);
      setMsg("Registered! Redirecting to login…");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      const text = err.response?.data?.error || "Registration failed";
      setMsg(text);
    }
  };

  return (
    <section className="flex flex-col items-center gap-4 mt-24">
      <h1 className="text-3xl font-bold">Register</h1>
      {msg && <p className="text-red-600">{msg}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-72">
        <input
          className="border p-2 rounded"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="bg-blue-600 text-white p-2 rounded">
          Register
        </button>
      </form>
      <p className="text-sm">
        Already have an account?{" "}
        <Link className="text-blue-600 underline" to="/login">
          Login
        </Link>
      </p>
    </section>
  );
}
