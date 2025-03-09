import React from "react";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = () => {

  return (
    <div className="relative h-screen p-5">
       <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-xl text-white font-semibold">Dashboard ⭐</h1>
    </div>
  );
};

export default Dashboard;
