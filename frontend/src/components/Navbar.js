import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";

export default function Navbar() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-gray-800 p-4 text-white flex gap-4">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
        <button
          onClick={() => setShowLogoutModal(true)}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}
