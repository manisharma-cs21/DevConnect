import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [form, setForm] = useState({
    bio: "",
    location: "",
    skills: "",
    experience: "",
    resume: "",
    github: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setForm({
        bio: res.data.bio || "",
        location: res.data.location || "",
        skills: res.data.skills?.join(", ") || "",
        experience: res.data.experience || "",
        resume: res.data.resume || "",
        github: res.data.github || "",
      });
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.put(
      "/users/profile",
      {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-[500px]"
      >
        <h2 className="text-2xl font-bold mb-4">
          Edit Profile
        </h2>

        <input
          name="bio"
          placeholder="Bio"
          className="w-full border p-2 mb-3 rounded"
          value={form.bio}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          className="w-full border p-2 mb-3 rounded"
          value={form.location}
          onChange={handleChange}
        />

        <input
          name="skills"
          placeholder="Skills (React, Node)"
          className="w-full border p-2 mb-3 rounded"
          value={form.skills}
          onChange={handleChange}
        />

        <input
          name="experience"
          placeholder="Experience"
          className="w-full border p-2 mb-3 rounded"
          value={form.experience}
          onChange={handleChange}
        />

        <input
          name="resume"
          placeholder="Resume link"
          className="w-full border p-2 mb-3 rounded"
          value={form.resume}
          onChange={handleChange}
        />

        <input
          name="github"
          placeholder="Github username"
          className="w-full border p-2 mb-3 rounded"
          value={form.github}
          onChange={handleChange}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Save Profile
        </button>

      </form>

    </div>
  );
}