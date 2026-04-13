import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import socket from "../socket";


export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [count, setCount] = useState(0);

  // for unread cunt
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await api.get("/notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const unread = res.data.filter((n) => !n.read).length;
    setCount(unread);
  };

  // for live notification count update
  useEffect(() => {
    socket.on("notification", () => {
      toast.success(data.message);
      setCount((prev) => prev + 1); // 🔥 increment
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  // for real-time notifications
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id;

      socket.emit("join", userId);
    }
  }, []);

  // decode role from token
  let role = null;
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    role = payload.role;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold text-blue-600 cursor-pointer"
        >
          DevConnect
        </h1>

        {/* Links */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">
            Jobs
          </Link>

          {token && role !== "admin" && (
            <Link to="/dashboard" className="hover:text-blue-600 transition">
              Dashboard
            </Link>
          )}
          {token && (
            <Link to="/profile" className="hover:text-blue-600 transition">
              Profile
            </Link>
          )}

          {/* ADMIN ONLY */}
          {role === "admin" && (
            <Link to="/create-job" className="hover:text-blue-600 transition">
              Create Job
            </Link>
          )}
          {role === "admin" && <Link to="/referrals">Referrals</Link>}

          {token && (
            <Link to="/notifications" className="relative">
              🔔
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </Link>
          )}

          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600 transition">
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
