import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CreateJob() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post(
        "/jobs",
        { title, company, location, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage("Job created successfully");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create job");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 text-white">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-gray-300 hover:text-white"
        >
          ← Back
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2 text-center">Create Job 🚀</h2>

        <p className="text-gray-400 text-center mb-6 text-sm">
          Post a new opportunity for candidates
        </p>

        {/* Message */}
        {message && <p className="mb-4 text-center text-blue-400">{message}</p>}

        {/* Form */}
        <form onSubmit={handleCreate} className="space-y-4">
          <input
            type="text"
            placeholder="Job Title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            placeholder="Company"
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            placeholder="Job Description"
            rows="4"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition disabled:bg-gray-500"
          >
            {loading ? "Creating..." : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
}
