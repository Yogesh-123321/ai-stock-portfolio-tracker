import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null);     // error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }
     
      try {
        const res=await
        axios.get("http://localhost:5000/api/user/profile", { // fixed route
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);
        localStorage.removeItem("token"); // remove invalid token
        setError("Session expired or unauthorized. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // redirect after 2s
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-900 text-white">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-900 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome, {user.name} 👋</h1>
        <p className="mb-1">Email: {user.email}</p>
        <p>Registered on: {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
