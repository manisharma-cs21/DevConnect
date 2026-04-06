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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600">
      
      <form
        onSubmit={handleLogin}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Login to continue to DevConnect
        </p>

        {error && (
          <p className="text-red-500 mb-4 text-sm">{error}</p>
        )}

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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}