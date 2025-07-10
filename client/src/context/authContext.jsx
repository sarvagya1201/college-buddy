// client/src/context/authContext.jsx
import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
        setAuthenticated(true);
      } catch (error) {
        console.log("Not authenticated or session expired");
        setAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.status === 200) {
        // Fetch user info after login
        const userRes = await api.get("/auth/me");
        setUser(userRes.data);
        setAuthenticated(true);
        return { success: true };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Login failed";
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setAuthenticated(false);
      setUser(null);
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post("/auth/register", { name, email, password });
      return { success: true, message: res.data.message };
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Registration failed";
      return { success: false, error: errorMessage };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        login,
        logout,
        register,
        loading,
        setAuthenticated, // if needed elsewhere
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
