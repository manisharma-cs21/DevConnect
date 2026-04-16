import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen text-white px-4">

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto pt-20">

        <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Connect. Apply. Get Referred 🚀
        </h1>

        <p className="text-gray-300 mt-6 text-lg max-w-2xl">
          DevConnect helps developers discover opportunities, apply seamlessly, 
          and get referrals to boost their chances of getting hired.
        </p>

        {/* CTA */}
        <div className="mt-10 flex gap-4 flex-wrap justify-center">

          {!token ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-medium transition shadow-lg hover:scale-105"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="border border-white/20 px-8 py-3 rounded-xl hover:bg-white/10 transition hover:scale-105"
              >
                Create Account
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/jobs")}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-medium transition shadow-lg hover:scale-105"
            >
              Explore Jobs
            </button>
          )}

        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-8">

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center hover:scale-105 transition shadow-lg">
          <div className="text-3xl mb-3">💼</div>
          <h3 className="text-xl font-semibold mb-2">Job Discovery</h3>
          <p className="text-gray-300 text-sm">
            Explore curated opportunities from top companies across tech.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center hover:scale-105 transition shadow-lg">
          <div className="text-3xl mb-3">🤝</div>
          <h3 className="text-xl font-semibold mb-2">Referral System</h3>
          <p className="text-gray-300 text-sm">
            Request referrals and increase your chances of getting shortlisted.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center hover:scale-105 transition shadow-lg">
          <div className="text-3xl mb-3">🔔</div>
          <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
          <p className="text-gray-300 text-sm">
            Stay updated with instant notifications on your applications.
          </p>
        </div>

      </div>

      {/* ABOUT SECTION */}
      <div className="max-w-4xl mx-auto mt-24 text-center">

        <h2 className="text-3xl font-bold mb-4">
          What is DevConnect?
        </h2>

        <p className="text-gray-300 leading-relaxed">
          DevConnect is a platform built for developers to simplify job searching and referrals.
          Instead of applying blindly, you can connect, request referrals, and track everything 
          in one place — making your job hunt smarter and faster.
        </p>

      </div>

      {/* FINAL CTA */}
      {!token && (
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to get started?
          </h2>

          <button
            onClick={() => navigate("/signup")}
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl font-medium transition shadow-lg hover:scale-105"
          >
            Join DevConnect 🚀
          </button>
        </div>
      )}

      {/* SPACING */}
      <div className="h-20"></div>
    </div>
  );
}