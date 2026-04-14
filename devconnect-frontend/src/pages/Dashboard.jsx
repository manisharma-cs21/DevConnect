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
  <div className="min-h-screen text-white px-4 py-8">

    <div className="max-w-7xl mx-auto">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-300 hover:text-white"
      >
        ← Back
      </button>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">
        My Dashboard 📊
      </h1>

      {/* STATS 🔥 */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl">
          <p className="text-gray-400 text-sm">Total Applications</p>
          <h2 className="text-2xl font-bold mt-2">
            {applications.length}
          </h2>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl">
          <p className="text-gray-400 text-sm">Status</p>
          <h2 className="text-2xl font-bold mt-2 text-green-400">
            Active
          </h2>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl">
          <p className="text-gray-400 text-sm">Profile Strength</p>
          <h2 className="text-2xl font-bold mt-2 text-blue-400">
            Good 🚀
          </h2>
        </div>

      </div>

      {/* APPLICATIONS */}
      <h2 className="text-xl font-semibold mb-4">
        My Applications
      </h2>

      {applications.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          No applications yet
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl hover:scale-[1.02] transition shadow-lg"
            >
              <h2 className="text-lg font-semibold">
                {app.job.title}
              </h2>

              <p className="text-blue-400 text-sm mt-1">
                {app.job.company}
              </p>

              <p className="text-gray-400 text-sm mt-2">
                📍 {app.job.location}
              </p>

              <div className="mt-4">
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  Applied
                </span>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  </div>
);
}