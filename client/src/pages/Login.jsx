import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  const { setAuthenticated, setToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    try {
      const res = await api.post("/auth/login", { email, password });
      // 1️⃣ store token (localStorage + context)
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setAuthenticated(true);
      // 2️⃣ redirect
      navigate("/dashboard");
    } catch (err) {
      if (!err.response) return setMsg("Server unreachable");
      const { status, data } = err.response;
      if (status === 404) setMsg("User doesn’t exist");
      else if (status === 401) setMsg("Incorrect password");
      else setMsg(data?.error || "Login failed");
    }
  };

  return (
    <section className="flex flex-col items-center gap-4 mt-24">
      <h1 className="text-3xl font-bold">Login</h1>
      {msg && <p className="text-red-600">{msg}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-72">
        <input
          className="border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
      <p className="text-sm">
        New user?{" "}
        <Link className="text-blue-600 underline" to="/register">
          Create an account
        </Link>
      </p>
    </section>
  );
}
