import { useState } from "react";
import api from "../api/axios";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      setMsg("Registered successfully ✅");
    } catch (err) {
      setMsg("Registration failed ❌");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input name="name" placeholder="Name" required onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
      <p>{msg}</p>
    </div>
  );
};

export default Register;
