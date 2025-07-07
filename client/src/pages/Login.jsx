import { useState } from "react";
import api from "../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/login", { email, password });
      setMsg("Login successful ✅");
    } catch (err) {
      setMsg("Login failed ❌");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" required value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <p>{msg}</p>
    </div>
  );
};

export default Login;
