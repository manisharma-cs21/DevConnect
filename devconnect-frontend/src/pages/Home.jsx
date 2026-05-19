import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-black text-white px-4 overflow-hidden">

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto pt-28">

        <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">

          <span className="text-white">
            Connect.
          </span>{" "}

          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Apply.
          </span>{" "}

          <span className="text-white">
            Get Referred.
          </span>

        </h1>

        <p className="text-gray-400 mt-8 text-lg md:text-xl max-w-3xl leading-relaxed">
          DevConnect helps developers discover opportunities, apply seamlessly,
          and get referrals to boost their chances of getting hired.
        </p>

        {/* CTA */}
        <div className="mt-12 flex gap-5 flex-wrap justify-center">

          {!token ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/20"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="border border-white/10 bg-white/5 px-8 py-3 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Create Account
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/jobs")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/20"
            >
              Explore Jobs
            </button>
          )}

        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-6xl mx-auto mt-28 grid md:grid-cols-3 gap-8">

        <div className="bg-[#0f1117] border border-white/5 p-8 rounded-3xl text-center transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/20">

          <div className="text-4xl mb-5">💼</div>

          <h3 className="text-2xl font-bold mb-3">
            Job Discovery
          </h3>

          <p className="text-gray-400 leading-relaxed">
            Explore curated opportunities from top companies across tech.
          </p>

        </div>

        <div className="bg-[#0f1117] border border-white/5 p-8 rounded-3xl text-center transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/20">

          <div className="text-4xl mb-5">🤝</div>

          <h3 className="text-2xl font-bold mb-3">
            Referral System
          </h3>

          <p className="text-gray-400 leading-relaxed">
            Request referrals and increase your chances of getting shortlisted.
          </p>

        </div>

        <div className="bg-[#0f1117] border border-white/5 p-8 rounded-3xl text-center transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/20">

          <div className="text-4xl mb-5">🔔</div>

          <h3 className="text-2xl font-bold mb-3">
            Real-time Updates
          </h3>

          <p className="text-gray-400 leading-relaxed">
            Stay updated with instant notifications on your applications.
          </p>

        </div>

      </div>

      {/* ABOUT SECTION */}
      <div className="max-w-5xl mx-auto mt-32 text-center">

        <h2 className="text-4xl font-black mb-6 text-white">
          What is DevConnect?
        </h2>

        <p className="text-gray-400 leading-relaxed text-lg max-w-3xl mx-auto">
          DevConnect is a platform built for developers to simplify job searching and referrals.
          Instead of applying blindly, you can connect, request referrals, and track everything
          in one place — making your job hunt smarter and faster.
        </p>

      </div>

      {/* FINAL CTA */}
      {!token && (
        <div className="mt-24 text-center">

          <h2 className="text-3xl font-bold mb-5">
            Ready to get started?
          </h2>

          <button
            onClick={() => navigate("/signup")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-500/20"
          >
            Join DevConnect
          </button>

        </div>
      )}

      <div className="h-24"></div>

    </div>
  );
}