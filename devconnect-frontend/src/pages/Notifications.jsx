import { useEffect, useState } from "react";
import api from "../services/api";
import socket from "../socket";
import { toast } from "react-toastify";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("token");

  // 🔥 fetch notifications on load
  useEffect(() => {
    fetchNotifications();
  }, []);

  // 🔥 real-time notifications
  useEffect(() => {
    socket.on("notification", (data) => {
      toast.success(data.message);

      // ✅ directly update UI (no API call)
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  // GET ALL
  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // MARK ALL READ
  const markAllRead = async () => {
    try {
      await api.put(
        "/notifications/read",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //  update UI instantly
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true }))
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <button
          onClick={() => window.history.back()}
          className="mb-6 text-gray-300 hover:text-white"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Notifications 🔔
          </h1>

          {/* Mark all read */}
          {notifications.length > 0 && (
            <button
              onClick={markAllRead}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* List */}
        {notifications.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            No notifications yet
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((n) => (
              <div
                key={n._id}
                className={`p-4 rounded-xl border backdrop-blur-xl transition shadow-md
                ${
                  n.read
                    ? "bg-white/5 border-white/10 text-gray-300"
                    : "bg-blue-500/10 border-blue-400 text-white"
                }`}
              >
                <div className="flex justify-between items-center">

                  {/* Message */}
                  <p className="text-sm">{n.message}</p>

                  {/* Badge */}
                  {!n.read && (
                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                      New
                    </span>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}