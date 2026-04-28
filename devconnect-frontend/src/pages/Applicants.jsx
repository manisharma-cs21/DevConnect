import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Applicants() {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ✅ FIXED: function outside
  const fetchApplicants = async () => {
    try {
      const res = await api.get(`/applications/job/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApplicants(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [id]);

  //  update status
  const updateStatus = async (appId, status) => {
  try {
    const res = await api.put(
      `/applications/${appId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);
    const updatedApp = res.data;

    // 🔥 SAFE STATE UPDATE
    setApplicants((prev) =>
      prev.map((app) =>
        app._id === appId ? updatedApp : app
      )
    );

    fetchApplicants(); // Refresh list

  } catch (error) {
    console.log(error);
  }
};

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
        <h1 className="text-3xl font-bold mb-6">Applicants 👨‍💻</h1>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applicants.map((app) => (
            <div
              key={app._id}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl shadow-lg hover:scale-[1.02] transition"
            >
              {/* Name */}
              <h2 className="font-semibold text-lg">{app.user?.name}</h2>

              {/* Email */}
              <p className="text-gray-400 text-sm">{app.user?.email}</p>

              {/* STATUS */}
              <div className="mt-3">
                <span
                  className={`px-2 py-1 text-xs rounded-full
                    ${
                      app.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : app.status === "shortlisted"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                    }
                  `}
                >
                  {app.status}
                </span>
              </div>

              {/* Skills */}
              <div className="mt-3 flex flex-wrap gap-2">
                {app.user?.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Experience */}
              <p className="text-sm text-gray-400 mt-3">
                Experience: {app.user?.experience || "Not added"}
              </p>

              {/* Links */}
              <div className="flex gap-2 mt-4">
                {app.user?.resume && (
                  <a
                    href={app.user.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm transition"
                  >
                    Resume
                  </a>
                )}

                <button
                  onClick={() => navigate(`/user/${app.user._id}`)}
                  className="border border-blue-500 text-blue-400 px-3 py-1.5 rounded-lg text-sm hover:bg-blue-500/10 transition"
                >
                  Profile
                </button>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2 mt-4">
                <button
                  disabled={app.status === "shortlisted"}
                  onClick={() => updateStatus(app._id, "shortlisted")}
                  className={`px-3 py-1.5 rounded-lg text-sm transition ${
                    app.status === "shortlisted"
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {app.status === "shortlisted" ? "Shortlisted" : "Shortlist"}
                </button>

                <button
                  disabled={app.status === "rejected"}
                  onClick={() => updateStatus(app._id, "rejected")}
                  className={`px-3 py-1.5 rounded-lg text-sm transition ${
                    app.status === "rejected"
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                >
                  {app.status === "rejected" ? "Rejected" : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {applicants.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            No applicants yet
          </div>
        )}
      </div>
    </div>
  );
}
