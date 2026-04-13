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
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 border">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-gray-400 text-sm">Experience</p>
            <p className="font-medium text-lg">
              {user.experience || "Not added"}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Location</p>
            <p className="font-medium text-lg">
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
                className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
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
              className="border border-black px-5 py-2 rounded-lg hover:bg-black hover:text-white transition"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
