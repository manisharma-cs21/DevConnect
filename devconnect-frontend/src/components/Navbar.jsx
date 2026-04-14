import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import socket from "../socket";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [count, setCount] = useState(0);

  // 🔥 fetch notifications count
  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await api.get("/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const unread = res.data.filter((n) => !n.read).length;
      setCount(unread);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 initial load
  useEffect(() => {
    fetchNotifications();
  }, [token]);

  // 🔥 real-time notification sync
  useEffect(() => {
    socket.on("notification", async (data) => {
      toast.success(data.message);

      // ✅ always fetch correct unread count
      await fetchNotifications();
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  // 🔥 join socket room
  useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id;

      socket.emit("join", userId);
    }
  }, [token]);

  // decode role
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
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold text-white cursor-pointer tracking-wide"
        >
          DevConnect
        </h1>

        {/* Links */}
        <div className="flex items-center gap-6 text-gray-300 font-medium">

          <Link to="/" className="hover:text-white transition">
            Home
          </Link>

          <Link to="/jobs" className="hover:text-white transition">
            Jobs
          </Link>

          {token && role !== "admin" && (
            <Link to="/dashboard" className="hover:text-white transition">
              Dashboard
            </Link>
          )}

          {token && (
            <Link to="/profile" className="hover:text-white transition">
              Profile
            </Link>
          )}

          {/* ADMIN */}
          {role === "admin" && (
            <Link to="/create-job" className="hover:text-white transition">
              Create Job
            </Link>
          )}

          {role === "admin" && (
            <Link to="/referrals" className="hover:text-white transition">
              Referrals
            </Link>
          )}

          {/* 🔔 Notifications */}
          {token && (
            <Link
              to="/notifications"
              className="relative hover:scale-110 transition"
            >
              🔔
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </Link>
          )}

          {/* Auth */}
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg transition shadow-md"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-white transition">
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg transition shadow-md"
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