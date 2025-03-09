// Imports.
import React from "react";
import { Link } from "react-router-dom";
import { Home, Gamepad2 } from "lucide-react"; 

// Frontend.
const Sidebar = () => {
  return (
    <div className="w-40 bg-[#28293d] text-white h-screen p-4">
      <ul>
        <li className="mb-2 flex items-center space-x-2">
          <Home size={20} /> 
          <Link to="/dashboard" className="text-white hover:text-gray-300">
            Home
          </Link>
        </li>
        <li className="mb-2 flex items-center space-x-2">
          <Gamepad2 size={20} /> 
          <Link to="/game" className="text-white hover:text-gray-300">
            Game
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
