import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen text-white px-4">

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto pt-24">

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
          <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-purple-500 bg-clip-text text-transparent">
            Connect.
          </span>{" "}
          <span className="text-white">
            Apply.
          </span>{" "}
          <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Get Referred
          </span>
        </h1>

        <p className="text-gray-300 mt-8 text-lg md:text-xl max-w-3xl leading-relaxed">
          DevConnect helps developers discover opportunities, apply seamlessly,
          and get referrals to boost their chances of getting hired.
        </p>

        {/* CTA */}
        <div className="mt-12 flex gap-5 flex-wrap justify-center">

          {!token ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-linear-to-r from-blue-600 to-purple-600 px-8 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-blue-500/30"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="border border-white/10 bg-white/5 backdrop-blur-md px-8 py-3 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                Create Account
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/jobs")}
              className="bg-linear-to-r from-blue-600 to-purple-600 px-8 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-blue-500/30"
            >
              Explore Jobs
            </button>
          )}

        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-6xl mx-auto mt-24 grid md:grid-cols-3 gap-8">

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center hover:scale-105 transition-all duration-300 shadow-xl hover:border-blue-500/30">

          <div className="text-4xl mb-5">💼</div>

          <h3 className="text-2xl font-bold mb-3">
            Job Discovery
          </h3>

          <p className="text-gray-300 leading-relaxed">
            Explore curated opportunities from top companies across tech.
          </p>

        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center hover:scale-105 transition-all duration-300 shadow-xl hover:border-purple-500/30">

          <div className="text-4xl mb-5">🤝</div>

          <h3 className="text-2xl font-bold mb-3">
            Referral System
          </h3>

          <p className="text-gray-300 leading-relaxed">
            Request referrals and increase your chances of getting shortlisted.
          </p>

        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center hover:scale-105 transition-all duration-300 shadow-xl hover:border-cyan-500/30">

          <div className="text-4xl mb-5">🔔</div>

          <h3 className="text-2xl font-bold mb-3">
            Real-time Updates
          </h3>

          <p className="text-gray-300 leading-relaxed">
            Stay updated with instant notifications on your applications.
          </p>

        </div>

      </div>

      {/* ABOUT SECTION */}
      <div className="max-w-5xl mx-auto mt-28 text-center">

        <h2 className="text-4xl font-extrabold mb-6 bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          What is DevConnect?
        </h2>

        <p className="text-gray-300 leading-relaxed text-lg max-w-3xl mx-auto">
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
            className="bg-linear-to-r from-blue-600 to-purple-600 px-10 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-purple-500/30"
          >
            Join DevConnect
          </button>

        </div>
      )}

      {/* SPACING */}
      <div className="h-24"></div>

    </div>
  );
}