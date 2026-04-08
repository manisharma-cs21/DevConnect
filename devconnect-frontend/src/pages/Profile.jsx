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
    <div className="min-h-screen bg-gray-100">
      
      {/* BANNER */}
      <div className="h-40 bg-linear-to-r from-blue-600 to-indigo-600"></div>

      <div className="max-w-5xl mx-auto px-6">
        
        <div className="bg-white rounded-2xl shadow-lg p-8 -mt-20">

          {/* HEADER */}
          <div className="flex justify-between items-center">

            <div className="flex items-center gap-6">
              
              {githubData && (
                <img
                  src={githubData.avatar_url}
                  className="w-24 h-24 rounded-full border-4 border-white shadow"
                />
              )}

              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {profile.name}
                </h1>

                <p className="text-gray-500">
                  {profile.bio || "No bio added"}
                </p>

                {/* COMPLETION BAR */}
                <div className="mt-3 w-64">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">
                      Profile Completion
                    </span>
                    <span className="font-medium">
                      {completion}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* GITHUB CARD */}
          {githubData && (
            <div className="bg-gray-50 p-4 rounded-xl mt-6 flex justify-between items-center">
              
              <div>
                <p className="font-semibold">
                  {githubData.login}
                </p>

                <p className="text-sm text-gray-500">
                  {githubData.public_repos} Repos • {githubData.followers} Followers
                </p>
              </div>

              <a
                href={githubData.html_url}
                target="_blank"
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                GitHub
              </a>

            </div>
          )}

          {/* INFO GRID */}
          <div className="grid grid-cols-2 gap-6 mt-6">

            <div>
              <p className="text-gray-400 text-sm">Location</p>
              <p className="font-medium">
                {profile.location || "Not added"}
              </p>
            </div>

            <div>
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
                  className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
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
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
              >
                View Resume
              </a>
            )}

            <button
              onClick={() => navigate("/edit-profile")}
              className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50"
            >
              Edit Profile
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}