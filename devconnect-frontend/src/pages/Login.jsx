import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/");

    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
  <div className="min-h-screen flex items-center justify-center px-4">

    {/* Card */}
    <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-white/70 hover:text-white mb-4 transition"
      >
        ← Back
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold text-white text-center mb-2">
        Welcome Back 
      </h2>

      <p className="text-gray-300 text-center mb-6 text-sm">
        Login to continue to DevConnect
      </p>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm mb-4 text-center">
          {error}
        </p>
      )}

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4">

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:bg-gray-500"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

      {/* Footer */}
      <p className="text-gray-300 text-sm text-center mt-6">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-blue-400 cursor-pointer hover:underline"
        >
          Signup
        </span>
      </p>

    </div>
  </div>
);
}