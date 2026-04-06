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
        }
      );

      setMessage("Job created successfully");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to create job"
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      
      <form
        onSubmit={handleCreate}
        className="bg-white p-8 rounded-xl shadow-md w-[500px]"
      >
        <h2 className="text-2xl font-bold mb-6">
          Create Job
        </h2>

        {message && (
          <p className="mb-4 text-blue-600">
            {message}
          </p>
        )}

        <input
          type="text"
          placeholder="Job Title"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Company"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setLocation(e.target.value)}
        />

        <textarea
          placeholder="Job Description"
          className="w-full border p-2 mb-4 rounded"
          rows="4"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Creating..." : "Create Job"}
        </button>
      </form>

    </div>
  );
}