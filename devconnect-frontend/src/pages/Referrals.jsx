import { useEffect, useState } from "react";
import api from "../services/api";

export default function Referrals() {
  const [referrals, setReferrals] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    const res = await api.get("/referrals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setReferrals(res.data);
  };

  const updateStatus = async (id, status) => {
    await api.put(
      `/referrals/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    fetchReferrals();
  };

  return (
    <div className="min-h-screen text-white px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Back */}
        <button
          onClick={() => window.history.back()}
          className="mb-6 text-gray-300 hover:text-white"
        >
          ← Back
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-6">Referral Requests 🔥</h1>

        {/* List */}
        <div className="space-y-4">
          {referrals.map((ref) => (
            <div
              key={ref._id}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-xl shadow-lg hover:scale-[1.01] transition"
            >
              <div className="flex justify-between items-center">
                {/* User Info */}
                <div>
                  <h2 className="font-semibold text-lg">{ref.user.name}</h2>

                  <p className="text-gray-400 text-sm">
                    {ref.job?.title} - {ref.job?.company}
                  </p>
                </div>

                {/* STATUS BADGE */}
                {ref.status === "pending" && (
                  <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                    Pending
                  </span>
                )}

                {ref.status === "accepted" && (
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                    Accepted
                  </span>
                )}

                {ref.status === "rejected" && (
                  <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                    Rejected
                  </span>
                )}
              </div>

              {/* ACTIONS */}
              {ref.status === "pending" && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => updateStatus(ref._id, "accepted")}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => updateStatus(ref._id, "rejected")}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty */}
        {referrals.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            No referral requests
          </div>
        )}
      </div>
    </div>
  );
}
