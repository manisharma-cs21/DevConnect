import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function Applicants() {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplicants = async () => {
      const res = await api.get(
        `/jobs/${id}/applicants`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplicants(res.data);
    };

    fetchApplicants();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      <h1 className="text-2xl font-bold mb-6">
        Applicants
      </h1>

      <div className="space-y-4">
        
        {applicants.map((app) => (
          <div
            key={app._id}
            className="bg-white p-4 rounded-lg shadow"
          >
            <h2 className="font-semibold">
              {app.user.name}
            </h2>

            <p className="text-gray-600 text-sm">
              {app.user.email}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}