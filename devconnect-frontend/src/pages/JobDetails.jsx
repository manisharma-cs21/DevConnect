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
        }
      );

      alert("Applied successfully");

    } catch (error) {
      alert("Already applied");
    }
  };

  if (!job) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-2xl font-bold">{job.title}</h1>

        <p className="text-blue-600 mt-2">{job.company}</p>

        <p className="text-gray-500 mt-1">📍 {job.location}</p>

        <p className="mt-6 text-gray-700">{job.description}</p>

        <button
          onClick={handleApply}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Apply Now
        </button>

      </div>
    </div>
  );
}