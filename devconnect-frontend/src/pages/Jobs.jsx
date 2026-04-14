import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [referrals, setReferrals] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  let role = null;

  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    role = payload.role;
  }

  useEffect(() => {
    fetchJobs();
    fetchAppliedJobs();
    fetchReferrals();
  }, []);

  const fetchJobs = async () => {
    const res = await api.get("/jobs");
    setJobs(res.data);
  };

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

  // fetch referrals
  const fetchReferrals = async () => {
    if (!token) return;

    try {
      const res = await api.get("/referrals/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const map = {};

      res.data.forEach((r) => {
        map[r.job._id] = r.status;
      });

      setReferrals(map);

    } catch (error) {
      console.log(error);
    }
  };

  // request referral (FIXED)
  const handleReferral = async (jobId) => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await api.post(
        "/referrals/request",
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReferrals({
        ...referrals,
        [jobId]: "pending",
      });

    } catch (error) {
      alert(
        error.response?.data?.message || "Already requested"
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
  <div className="min-h-screen text-white">

    {/* Back Button */}
    <div className="max-w-7xl mx-auto px-4 pt-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 hover:underline"
      >
        ← Back
      </button>
    </div>

    {/* HERO SECTION 🔥 */}
    <div className="max-w-7xl mx-auto px-4 text-center mb-10">
      <h1 className="text-4xl font-bold">
        Find Your Dream Job 🚀
      </h1>
      <p className="text-gray-300 mt-2">
        Explore opportunities from top companies
      </p>
    </div>

    {/* Message */}
    {message && (
      <div className="max-w-7xl mx-auto px-4 mb-4">
        <div className="p-3 bg-green-500 text-white rounded">
          {message}
        </div>
      </div>
    )}

    {/* JOB GRID */}
    <div className="max-w-7xl mx-auto px-4 pb-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {jobs.map((job) => (
        <div
          key={job._id}
          className="bg-white/90 text-black backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition border"
        >

          {/* Title */}
          <h2 className="text-lg font-semibold">
            {job.title}
          </h2>

          {/* Company */}
          <p className="text-blue-600 font-medium">
            {job.company}
          </p>

          {/* Location */}
          <p className="text-gray-500 text-sm">
            📍 {job.location}
          </p>

          {/* Description */}
          <p className="text-gray-600 text-sm mt-2 line-clamp-3">
            {job.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-2 mt-4">

            {/* APPLY */}
            {role !== "admin" && (
              <button
                onClick={() => handleApply(job._id)}
                disabled={appliedJobs.includes(job._id)}
                className={`py-2 rounded-lg ${
                  appliedJobs.includes(job._id)
                    ? "bg-green-500 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {appliedJobs.includes(job._id)
                  ? "Applied"
                  : "Apply Now"}
              </button>
            )}

            {/* DETAILS */}
            <button
              onClick={() => navigate(`/jobs/${job._id}`)}
              className="border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50"
            >
              Details
            </button>

            {/* REFERRAL STATUS */}
            {role !== "admin" && referrals[job._id] === "pending" && (
              <button className="bg-yellow-500 text-white py-2 rounded-lg">
                Pending
              </button>
            )}

            {role !== "admin" && referrals[job._id] === "accepted" && (
              <button className="bg-green-600 text-white py-2 rounded-lg">
                Referred
              </button>
            )}

            {role !== "admin" && referrals[job._id] === "rejected" && (
              <button className="bg-red-500 text-white py-2 rounded-lg">
                Rejected
              </button>
            )}

            {/* REQUEST */}
            {role !== "admin" && !referrals[job._id] && (
              <button
                onClick={() => handleReferral(job._id)}
                className="border border-purple-600 text-purple-600 py-2 rounded-lg hover:bg-purple-50"
              >
                Request Referral
              </button>
            )}

            {/* ADMIN */}
            {role === "admin" && (
              <button
                onClick={() =>
                  navigate(`/jobs/${job._id}/applicants`)
                }
                className="border border-green-600 text-green-600 py-2 rounded-lg hover:bg-green-50"
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