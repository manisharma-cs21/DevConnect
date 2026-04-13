import { useEffect, useState } from "react";
import api from "../services/api";
import socket from "../socket";
import { toast } from "react-toastify";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotifications();
    markAllRead();
  }, []);

  // for real-time notifications

  useEffect(() => {
    socket.on("notification", (data) => {
      toast.success(data.message);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  const markAllRead = async () => {
    try {
      await api.put(
        "/notifications/read",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNotifications = async () => {
    const res = await api.get("/notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setNotifications(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n._id} className="bg-white p-4 rounded-lg shadow">
            {n.message}
          </div>
        ))}
      </div>
    </div>
  );
}
