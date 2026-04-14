import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(res.data);

      if (res.data.github) {
        const githubRes = await fetch(
          `https://api.github.com/users/${res.data.github}`
        );

        const data = await githubRes.json();
        setGithubData(data);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div className="p-8">Loading...</div>;

  // PROFILE COMPLETION LOGIC
  const fields = [
    profile.bio,
    profile.location,
    profile.skills?.length,
    profile.experience,
    profile.resume,
    profile.github,
  ];

  const filled = fields.filter(Boolean).length;
  const completion = Math.round((filled / fields.length) * 100);

  return (
  <div className="min-h-screen text-white px-4 py-8">

    <div className="max-w-5xl mx-auto">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-300 hover:text-white"
      >
        ← Back
      </button>

      {/* MAIN CARD */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div className="flex items-center gap-6">

            {githubData && (
              <img
                src={githubData.avatar_url}
                className="w-24 h-24 rounded-full border-2 border-white shadow-lg"
              />
            )}

            <div>
              <h1 className="text-3xl font-bold">
                {profile.name}
              </h1>

              <p className="text-gray-300">
                {profile.bio || "No bio added"}
              </p>

              {/* COMPLETION */}
              <div className="mt-3 w-64">
                <div className="flex justify-between text-xs mb-1 text-gray-400">
                  <span>Profile Completion</span>
                  <span>{completion}%</span>
                </div>

                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${completion}%` }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* GITHUB */}
        {githubData && (
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl mt-6 flex justify-between items-center">

            <div>
              <p className="font-semibold">
                {githubData.login}
              </p>

              <p className="text-sm text-gray-400">
                {githubData.public_repos} Repos • {githubData.followers} Followers
              </p>
            </div>

            <a
              href={githubData.html_url}
              target="_blank"
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
            >
              GitHub
            </a>

          </div>
        )}

        {/* INFO */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">

          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-gray-400 text-sm">Location</p>
            <p className="font-medium">
              {profile.location || "Not added"}
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-gray-400 text-sm">Experience</p>
            <p className="font-medium">
              {profile.experience || "Not added"}
            </p>
          </div>

        </div>

        {/* SKILLS */}
        <div className="mt-6">
          <p className="text-gray-400 text-sm mb-2">Skills</p>

          <div className="flex flex-wrap gap-2">
            {profile.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-6">

          {profile.resume && (
            <a
              href={profile.resume}
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
            >
              View Resume
            </a>
          )}

          <button
            onClick={() => navigate("/edit-profile")}
            className="border border-blue-500 text-blue-400 px-5 py-2 rounded-lg hover:bg-blue-500/10 transition"
          >
            Edit Profile
          </button>

        </div>

      </div>
    </div>
  </div>
);
  
}