import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      setSuccess("Signup successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600">
      
      <form
        onSubmit={handleSignup}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
          Create Account
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Join DevConnect and find opportunities
        </p>

        {error && (
          <p className="text-red-500 mb-4 text-sm">{error}</p>
        )}

        {success && (
          <p className="text-green-600 mb-4 text-sm">{success}</p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 mb-4 rounded-lg"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 mb-4 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 mb-6 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-2 rounded-lg disabled:bg-gray-400"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}