import React from "react";
import { useNavigate } from "react-router-dom"; 

const Footer = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <footer className="w-full bg-[#28293d] text-white py-8 px-6 flex justify-between items-start">
      {/* Left: Logo & Slogan */}
      <div className="flex flex-col items-start space-y-2 text-white">
        <img
          src="https://littlegames.gg/wp-content/uploads/2023/11/little-games-2.png"
          alt="Little Games Logo"
          className="w-28 h-auto cursor-pointer"
          onClick={() => navigate("/gamegrid")} // Navigate on click
        />
        <p className="text-lg font-semibold text-white">Let the world play</p>
      </div>

      {/* Middle Column */}
      <div className="flex items-start flex-col space-y-2 text-right text-white">
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Jobs</a>
        <a href="#" className="hover:underline">Privacy Statement</a>
        <a href="#" className="hover:underline">Terms of Use</a>
        <a href="#" className="hover:underline">Contact</a>
      </div>

      {/* Right Column */}
      <div className="flex items-start flex-col space-y-2 text-right text-white">
        <a href="#" className="hover:underline">Little Games for Developers</a>
        <a href="#" className="hover:underline">Little Games Kids</a>
        <a href="#" className="hover:underline">Cookie Statement</a>
        <a href="#" className="hover:underline">FAQ</a>
      </div>
    </footer>
  );
};

export default Footer;

