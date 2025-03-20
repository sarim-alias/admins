import React, { useState } from "react";
import { Share, Code, Copy, X } from "lucide-react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaXTwitter,
  FaWhatsapp,
  FaLinkedin,
  FaReddit,
} from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs.jsx";
import { toast } from "react-hot-toast";

const GameStats = ({ gameTitle = "Ragdoll Archers" }) => {
  const [activeSection, setActiveSection] = useState(null);
  const location = useLocation();

  const currentURL = `${window.location.origin}${location.pathname}`;
  const gameSlug = location.pathname.split("/").pop(); // Extract game slug from URL
  const embedURL = `${window.location.origin}/embed/${gameSlug}?url=${encodeURIComponent(currentURL)}`;
  const embedCode = `<iframe src="${embedURL}" width="800" height="600"></iframe>`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const gameDetails = {
    developer: "Ericetto",
    rating: "9.2 (1,275,264 votes)",
    releaseDate: "August 2023",
    lastUpdated: "July 2024",
    technology: "HTML5",
    platforms: "Browser (desktop, mobile, tablet), App Store (Android)",
    description:
      "Ragdoll Archers is an archery game featuring bow and arrow-equipped stickmen with ragdoll physics. Fire arrows at a range of opponents while earning points to upgrade your abilities and ammunition. Play two-player PvP against your friend or team up with them to defeat a range of foes!",
    howToPlay:
      "Line up your shots carefully, and fire! Starting with the basic arrows and baseline stats, you will be faced with various enemies. Some of these opponents might have stronger shields, increased health, or faster arrows. Focus on upgrading your bow and abilities to improve your chances of winning!",
  };

  const categoryTags = [
    { name: "Casual", count: 1073, slug: "casual" },
    { name: "2 Player", count: 205, slug: "2 player" },
    { name: "Driving", count: 194, slug: "driving" },
    { name: "New", count: 301, slug: "new" },
  ];
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <Breadcrumbs
        paths={[
          { name: "Games", link: "/games" },
          { name: gameTitle, link: null },
        ]}
      />

      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">{gameTitle}</h2>
        <div className="flex gap-4">
          {/* Share Button */}
          <button
            onClick={() => toggleSection("share")}
            className={`text-white flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeSection === "share"
                ? "bg-blue-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <Share size={20} />
            Share
          </button>

          {/* Embed Button */}
          <button
            onClick={() => toggleSection("embed")}
            className={`text-white flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeSection === "embed"
                ? "bg-blue-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <Code size={20} />
            Embed
          </button>
        </div>
        {/* Centered Modal for Share & Embed */}
        {activeSection && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-96 relative animate-fade-in">
              {/* Close Button */}
              <button
                onClick={() => setActiveSection(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
              >
                <X size={20} />
              </button>

              {/* Share Section */}
              {activeSection === "share" && (
                <>
                  <h3 className="text-white text-lg font-bold mb-4">
                    Share this game
                  </h3>
                  <div className="flex gap-3 mb-4 flex items-center justify-center">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${currentURL}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 p-2 rounded"
                    >
                      <FaFacebook size={20} />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${currentURL}&text=Play ${gameTitle}!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black p-2 rounded"
                    >
                      <FaXTwitter size={20} />
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?text=Play ${gameTitle}! ${currentURL}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 p-2 rounded"
                    >
                      <FaWhatsapp size={20} />
                    </a>
                    <a
                      href={`https://www.reddit.com/submit?url=${currentURL}&title=Play ${gameTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-500 p-2 rounded"
                    >
                      <FaReddit size={20} />
                    </a>
                  </div>

                  {/* Copy Link */}
                  <div className="flex">
                    <input
                      type="text"
                      value={currentURL}
                      readOnly
                      className="bg-gray-700 text-white p-2 rounded-l flex-1"
                    />
                    <button
                      onClick={() => copyToClipboard(currentURL)}
                      className="bg-blue-600 p-2 rounded-r hover:bg-blue-500 transition-colors"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </>
              )}

              {/* Embed Section */}
              {activeSection === "embed" && (
                <>
                  <h3 className="text-white text-lg font-bold mb-2">
                    Embed {gameTitle}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Copy and paste this iframe code:
                  </p>
                  <div className="flex">
                    <input
                      type="text"
                      value={embedCode}
                      readOnly
                      className="bg-gray-700 text-white p-2 rounded-l flex-1"
                    />
                    <button
                      onClick={() => copyToClipboard(embedCode)}
                      className="bg-blue-600 p-2 rounded-r hover:bg-blue-500 transition-colors"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Game Details */}
        <div className="rounded-lg mt-1">
          <p>
            <span className="text-gray-400">Rating:</span> {gameDetails.rating}
          </p>
          <p>
            <span className="text-gray-400">Released:</span>{" "}
            {gameDetails.releaseDate}
          </p>
        </div>
       {/* Category Tags */}
       <div className="mt-2">
          <div className="flex flex-wrap gap-2">
            {categoryTags.map((tag) => (
              <Link
                key={tag.slug}
                to={`/category/${tag.slug}`}
                className="inline-flex rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <span className="px-4 py-2 font-medium">{tag.name}</span>
                <span className="px-3 py-2 bg-indigo-800 rounded-r-md text-indigo-200">
                  {tag.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
