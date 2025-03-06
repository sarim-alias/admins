import React from "react";

const Navbar = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/admin/logout", {
        method: "POST",
        credentials: "include",
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("jwt"); // Clear token
        alert(data.message);
        window.location.href = "/login"; // Redirect to login page
      } else {
        alert("Logout failed: " + data.error);
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <nav className="flex items-center justify-between bg-gray-900 text-white px-6 py-4 shadow-md">
      <h1 className="text-3xl text-rose-400 font-bold">Navbar 🖼️⭐</h1>
      <button
        onClick={handleLogout}
        className="bg-white text-black border border-gray-400 px-5 py-2 rounded-lg shadow-md hover:bg-gray-200 transition-all font-bold"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
