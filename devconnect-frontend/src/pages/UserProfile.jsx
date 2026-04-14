import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
  <div className="min-h-screen text-white px-4 py-10">

    <div className="max-w-4xl mx-auto">

      {/* Back */}
      <button
        onClick={() => window.history.back()}
        className="mb-6 text-gray-300 hover:text-white"
      >
        ← Back
      </button>

      {/* CARD */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            {user.name}
          </h1>
          <p className="text-gray-400">
            {user.email}
          </p>
        </div>

        {/* Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">

          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-gray-400 text-sm">Experience</p>
            <p className="font-medium">
              {user.experience || "Not added"}
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-gray-400 text-sm">Location</p>
            <p className="font-medium">
              {user.location || "Not added"}
            </p>
          </div>

        </div>

        {/* Skills */}
        <div className="mb-6">
          <p className="text-gray-400 text-sm mb-2">Skills</p>

          <div className="flex flex-wrap gap-2">
            {user.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 flex-wrap">

          {user.resume && (
            <a
              href={user.resume}
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
            >
              View Resume
            </a>
          )}

          {user.github && (
            <a
              href={`https://github.com/${user.github}`}
              target="_blank"
              className="border border-white/30 px-5 py-2 rounded-lg hover:bg-white/10 transition"
            >
              GitHub
            </a>
          )}

        </div>

      </div>
    </div>
  </div>
);
}
