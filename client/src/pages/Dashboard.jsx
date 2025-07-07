import api from "../api/axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext.jsx";

const Dashboard = () => {
  const { token } = useAuth();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMsg(res.data.message);
      } catch (err) {
        setMsg("Access denied");
      }
    };

    fetchData();
  }, [token]);

  return <div><h2>Dashboard</h2><p>{msg}</p></div>;
};

export default Dashboard;
