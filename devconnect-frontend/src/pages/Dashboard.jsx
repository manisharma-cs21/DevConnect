import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchApplications = async () => {
      try {
        const res = await api.get("/applications/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setApplications(res.data);

      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500">Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      <h1 className="text-2xl font-bold mb-6">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No applications yet
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">
                {app.job.title}
              </h2>

              <p className="text-blue-600 text-sm mt-1">
                {app.job.company}
              </p>

              <p className="text-gray-500 text-sm mt-2">
                📍 {app.job.location}
              </p>

              <div className="mt-4">
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                  Applied
                </span>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}