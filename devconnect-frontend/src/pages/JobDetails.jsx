import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJob = async () => {
      const res = await api.get("/jobs");
      const foundJob = res.data.find((j) => j._id === id);
      setJob(foundJob);
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await api.post(
        `/applications/apply/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Applied successfully");
    } catch (error) {
      alert("Already applied");
    }
  };

  if (!job) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-300 hover:text-white"
        >
          ← Back
        </button>

        {/* CARD */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{job.title}</h1>

            <p className="text-blue-400 mt-2 font-medium">{job.company}</p>

            <p className="text-gray-400 text-sm mt-1">📍 {job.location}</p>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 my-6"></div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Job Description</h2>

            <p className="text-gray-300 leading-relaxed">{job.description}</p>
          </div>

          {/* Apply Button */}
          <div className="mt-8">
            <button
              onClick={handleApply}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition shadow-lg"
            >
              Apply Now 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
