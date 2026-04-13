import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Applicants() {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplicants = async () => {
      const res = await api.get(
        `/applications/job/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplicants(res.data);
    };

    fetchApplicants();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      <h1 className="text-2xl font-bold mb-6">
        Applicants
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {applicants.map((app) => (
          <div
            key={app._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-md transition border"
          >
            <h2 className="font-semibold text-lg">
              {app.user?.name}
            </h2>

            <p className="text-gray-600 text-sm">
              {app.user?.email}
            </p>

            {/* Skills */}
            <div className="mt-3 flex flex-wrap gap-2">
              {app.user?.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Experience */}
            <p className="text-sm text-gray-500 mt-2">
              Experience: {app.user?.experience || "Not added"}
            </p>

            {/* Buttons */}
            <div className="flex gap-2 mt-4">

              {app.user?.resume && (
                <a
                  href={app.user.resume}
                  target="_blank"
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Resume
                </a>
              )}

              <button
                onClick={() => navigate(`/user/${app.user._id}`)}
                className="border border-blue-600 text-blue-600 px-3 py-1 rounded text-sm"
              >
                Profile
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}