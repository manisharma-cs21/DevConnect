import { useEffect, useState } from "react";
import api from "../services/api";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotifications();
  }, []);

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
      
      <h1 className="text-2xl font-bold mb-6">
        Notifications
      </h1>

      <div className="space-y-3">
        
        {notifications.map((n) => (
          <div
            key={n._id}
            className="bg-white p-4 rounded-lg shadow"
          >
            {n.message}
          </div>
        ))}

      </div>

    </div>
  );
}