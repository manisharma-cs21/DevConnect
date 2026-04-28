import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [referrals, setReferrals] = useState({});

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let role = null;
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    role = payload.role;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchJobs = async () => {
    try {
      const res = await api.get(
        `/jobs?search=${debouncedSearch}&location=${location}`,
      );
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //  FILTER FETCH
  useEffect(() => {
    fetchJobs();
  }, [debouncedSearch, location]);

  // OTHER DATA
  useEffect(() => {
    fetchAppliedJobs();
    fetchReferrals();
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
        },
      );

      setAppliedJobs([...appliedJobs, jobId]);
      setMessage("Applied successfully!");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Already applied");
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

      const appliedIds = res.data.map((app) => app.job._id);
      setAppliedJobs(appliedIds);
    } catch (error) {
      console.log(error);
    }
  };

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
        },
      );

      setReferrals({
        ...referrals,
        [jobId]: "pending",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Already requested");
    }
  };

  return (
    <div className="min-h-screen text-white">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <button onClick={() => navigate(-1)} className="mb-4 hover:underline">
          ← Back
        </button>
      </div>

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-10">
        <h1 className="text-4xl font-bold">Find Your Dream Job 🚀</h1>
        <p className="text-gray-300 mt-2">
          Explore opportunities from top companies
        </p>
      </div>

      {/* 🔥 SEARCH + FILTER */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search jobs or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
          />

          {/*  Location Dropdown (Upgrade) */}
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full md:w-1/2 p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none"
          >
            <option value="" className="text-black">
              All Locations
            </option>
            <option value="Delhi" className="text-black">
              Delhi
            </option>
            <option value="Noida" className="text-black">
              Noida
            </option>
            <option value="Bangalore" className="text-black">
              Bangalore
            </option>
            <option value="Hyderabad" className="text-black">
              Hyderabad
            </option>
            <option value="Remote" className="text-black">
              Remote
            </option>
          </select>
        </div>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 mb-4">
          <div className="p-3 bg-green-500 text-white rounded">{message}</div>
        </div>
      )}

      {/* JOB GRID */}
      <div className="max-w-7xl mx-auto px-4 pb-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white/90 text-black p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition"
          >
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-blue-600 font-medium">{job.company}</p>
            <p className="text-gray-500 text-sm">📍 {job.location}</p>

            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
              {job.description}
            </p>

            <div className="flex flex-col gap-2 mt-4">
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
                  {appliedJobs.includes(job._id) ? "Applied" : "Apply Now"}
                </button>
              )}

              <button
                onClick={() => navigate(`/jobs/${job._id}`)}
                className="border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50"
              >
                Details
              </button>

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

              {role !== "admin" && !referrals[job._id] && (
                <button
                  onClick={() => handleReferral(job._id)}
                  className="border border-purple-600 text-purple-600 py-2 rounded-lg hover:bg-purple-50"
                >
                  Request Referral
                </button>
              )}

              {role === "admin" && (
                <button
                  onClick={() => navigate(`/jobs/${job._id}/applicants`)}
                  className="border border-green-600 text-green-600 py-2 rounded-lg hover:bg-green-50"
                >
                  Applicants
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY */}
      {jobs.length === 0 && (
        <div className="text-center text-gray-400 mt-10">No jobs found 😔</div>
      )}
    </div>
  );
}
