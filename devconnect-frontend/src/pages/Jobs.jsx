import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  let role = null;

  if (token) {
       const payload = JSON.parse(atob(token.split(".")[1]));
       role = payload.role;
  } 

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await api.get("/jobs");
      setJobs(res.data);
    };

    fetchJobs();
    fetchAppliedJobs();
  }, []);

  const handleApply = async (jobId) => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await api.post(
        `/applications/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppliedJobs([...appliedJobs, jobId]);
      setMessage("Applied successfully!");

      setTimeout(() => {
        setMessage("");
      }, 2000);

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Already applied"
      );
    }
  };

  const fetchAppliedJobs = async () => {
    if (!token) return;

    try {
      const res = await api.get("/applications/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const appliedIds = res.data.map(
        (app) => app.job._id
      );

      setAppliedJobs(appliedIds);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      <h1 className="text-2xl font-bold mb-6">
        Available Jobs
      </h1>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border"
          >
            <div className="mb-3">
              <h2 className="text-lg font-semibold text-gray-800">
                {job.title}
              </h2>

              <p className="text-blue-600 text-sm font-medium">
                {job.company}
              </p>

              <p className="text-gray-500 text-sm">
                📍 {job.location}
              </p>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {job.description}
            </p>

            <div className="flex gap-2">
              
              {role!== "admin" &&(
              <button
                onClick={() => handleApply(job._id)}
                disabled={appliedJobs.includes(job._id)}
                className={`w-full py-2 rounded-lg transition ${
                  appliedJobs.includes(job._id)
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {appliedJobs.includes(job._id) ? "Applied" : "Apply Now"}
              </button>
              )}

              <button
                onClick={() => navigate(`/jobs/${job._id}`)}
                className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50"
              >
                Details
              </button>
              {role === "admin" && (
                <button
                onClick={() => navigate(`/jobs/${job._id}/applicants`)}
                className="w-full border border-green-600 text-green-600 py-2 rounded-lg"
                 >
                  Applicants
                  </button>
                )}

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}