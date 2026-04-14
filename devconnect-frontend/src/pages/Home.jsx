import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center px-4">

      {/* HERO */}
      <div className="text-center max-w-3xl">

        <h1 className="text-5xl font-bold leading-tight">
          Connect. Apply. Get Referred 🚀
        </h1>

        <p className="text-gray-300 mt-4 text-lg">
          DevConnect helps you discover jobs, apply easily, and get referrals from professionals.
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">

          {!token ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-medium transition shadow-lg"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="border border-white/30 px-6 py-3 rounded-xl hover:bg-white/10 transition"
              >
                Create Account
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/jobs")}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-medium transition shadow-lg"
            >
              Explore Jobs
            </button>
          )}

        </div>

      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-2">💼 Jobs</h3>
          <p className="text-gray-300 text-sm">
            Browse jobs from top companies and apply instantly.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-2">🤝 Referrals</h3>
          <p className="text-gray-300 text-sm">
            Request referrals and boost your chances of getting hired.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-2">🔔 Notifications</h3>
          <p className="text-gray-300 text-sm">
            Get real-time updates on your applications and referrals.
          </p>
        </div>

      </div>

    </div>
  );
}