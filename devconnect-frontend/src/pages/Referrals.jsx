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
      }
    );

    fetchReferrals();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      <h1 className="text-2xl font-bold mb-6">
        Referral Requests
      </h1>

      <div className="space-y-4">
        
        {referrals.map((ref) => (
          <div
            key={ref._id}
            className="bg-white p-5 rounded-xl shadow border hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              
              <div>
                <h2 className="font-semibold text-lg">
                  {ref.user.name}
                </h2>

                <p className="text-gray-600">
                  {ref.job?.title} - {ref.job?.company}
                </p>
              </div>

              {/* STATUS BADGE */}
              {ref.status === "pending" && (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                  Pending
                </span>
              )}

              {ref.status === "accepted" && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Accepted
                </span>
              )}

              {ref.status === "rejected" && (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                  Rejected
                </span>
              )}

            </div>

            {/* ACTION BUTTONS */}
            {ref.status === "pending" && (
              <div className="flex gap-2 mt-4">
                
                <button
                  onClick={() =>
                    updateStatus(ref._id, "accepted")
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    updateStatus(ref._id, "rejected")
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Reject
                </button>

              </div>
            )}

          </div>
        ))}

      </div>

    </div>
  );
}