import { createContext, useState, useContext, useEffect } from "react";
import api from "../api/axios"; // Axios withCredentials: true

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Check auth on initial load
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await api.get("/auth/me"); // backend route to return user info if cookie is valid
        setAuthenticated(true);
        setUserRole(res.data.role); // { role: "student" }
      } catch (err) {
        setAuthenticated(false);
        setUserRole(null);
      }
    };

    verifyToken();
  }, []);

  const logout = async () => {
    await api.post("/auth/logout");
    setAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated, userRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
