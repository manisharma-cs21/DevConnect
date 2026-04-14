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

    // trim values
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // required fields
    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Invalid email format");
      setLoading(false);
      return;
    }

    // strong password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

    if (!passwordRegex.test(trimmedPassword)) {
      setError(
        "Password must contain uppercase, number & special character"
      );
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/signup", {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      });

      // save token
      localStorage.setItem("token", res.data.token);

      setSuccess("Signup successful! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
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
          Create Account 🚀
        </h2>

        <p className="text-gray-300 text-center mb-6 text-sm">
          Join DevConnect and find opportunities
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {/* Success */}
        {success && (
          <p className="text-green-400 text-sm mb-4 text-center">
            {success}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:bg-gray-500"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-gray-300 text-sm text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}