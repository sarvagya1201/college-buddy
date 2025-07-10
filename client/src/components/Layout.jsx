import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-10">
        {/* Left Side: Logo + Nav */}
        <div className="flex items-center gap-4">
          <h1
            onClick={() => navigate("/home")}
            className="text-2xl font-bold text-blue-600 cursor-pointer"
          >
            {/* Logo Image */}
            <img
              src="/logo.png"
              alt="College Buddy Logo"
              className="h-12 w-auto object-contain"
            />
            {/* OE Review */}
          </h1>
          <button
            onClick={() => navigate("/departments")}
            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold cursor-pointer"
          >
            Departments
          </button>
          <button
            onClick={() => navigate("/professors")}
            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold cursor-pointer"
          >
            Professors
          </button>
        </div>

        {/* Right Side: User Info + Actions + Logo */}
        <div className="flex items-center gap-4">
          {user && (
            <>
              <span className="text-sm text-gray-700">Hello, {user.name}</span>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer font-semibold"
              >
                Dashboard
              </button>
              <button
                onClick={logout}
                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="text-center text-sm font-bold text-gray-600 py-4 border-t bg-white">
        © {new Date().getFullYear()} Built with ❤️ by Bala & Sarvagya
      </footer>
    </div>
  );
}
