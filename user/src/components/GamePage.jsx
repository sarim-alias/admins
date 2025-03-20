import React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import GameStats from "./GameStats.jsx";
import GameTabs from "./GameTabs.jsx";
import { FaRegHeart } from "react-icons/fa";
import {
  Maximize2,
  Minimize2,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  X,
  Settings,
  Check,
} from "lucide-react";

const GamePage = () => {
  const { slug } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(1340000);
  const [dislikes, setDislikes] = useState(50000);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCookiesBar, setShowCookiesBar] = useState(true);
  const [open, setOpen] = useState(false); // State to open/close GameTabs

  const gameContainerRef = useRef(null);
  const iframeRef = useRef(null);

  // Utility function to generate slug
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const gameData = {
    1: {
      id: 1,
      title: "Hills of Steel",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/05/Hills-of-Steel-.webp",
    },
    2: {
      id: 2,
      title: "Shell Shockers",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/04/shell-shocker.webp",
    },
    3: {
      id: 3,
      title: "Smash Carts",
      image: "https://littlegames.gg/wp-content/uploads/2023/11/image-12.jpg",
    },
    4: {
      id: 4,
      title: "Vectaria",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/06/Vectaria.io_.webp",
    },
    5: {
      id: 5,
      title: "Stick Defenders",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/07/Stick-Defenders.webp",
    },
    6: {
      id: 6,
      title: "CoWardle Multiplayer",
      image: "https://littlegames.gg/wp-content/uploads/2024/04/CoWordle.webp",
    },
    7: {
      id: 7,
      title: "Fruit Ninja",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/512x384-417.jpg",
    },
    8: {
      id: 8,
      title: "Basketball Legends",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/512x384-1309.jpg",
    },
    9: {
      id: 9,
      title: "Infinite Craft",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/08/Infinite-Craft.webp",
    },
    10: {
      id: 10,
      title: "Stick Merge",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/07/Stick-Merge.webp",
    },
    11: {
      id: 11,
      title: "Jetpack Joyride",
      image:
        "https://littlegames.gg/wp-content/uploads/2023/12/Snow-Rider-3D.webp",
    },
    12: {
      id: 12,
      title: "Chill Climb Racing",
      image: "https://littlegames.gg/wp-content/uploads/2024/05/Shark-io.webp",
    },
    13: {
      id: 13,
      title: "Among Us",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/07/Merge-Arena.webp",
    },
    14: {
      id: 14,
      title: "Cut the Rope",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/07/Google-Snake.webp",
    },
    15: {
      id: 15,
      title: "Angry Birds",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/07/Shovel-Pirate.webp",
    },
    16: {
      id: 16,
      title: "Crossy Road",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/06/Doodle-Jump.webp",
    },
    17: {
      id: 17,
      title: "Crazy Cars",
      image: "https://littlegames.gg/wp-content/uploads/2024/05/Crazy-Cars.jpg",
    },
    18: {
      id: 18,
      title: "Blumgi Ball",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/07/Blumgi-Ball.webp",
    },
    19: {
      id: 19,
      title: "Rolling Sky",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/07/Rolling-Sky.webp",
    },
    20: {
      id: 20,
      title: "Driftwave",
      image: "https://littlegames.gg/wp-content/uploads/2024/07/Driftwave.webp",
    },
    21: {
      id: 21,
      title: "Paper.io 2",
      image: "https://littlegames.gg/wp-content/uploads/2023/12/image-59.webp",
    },
    22: {
      id: 22,
      title: "Gunspin",
      image: "https://littlegames.gg/wp-content/uploads/2023/12/image-13.jpg",
    },
    23: {
      id: 23,
      title: "Hill Climb Racing 2",
      image:
        "https://littlegames.gg/wp-content/uploads/2023/12/hill-climb-racing-2.webp",
    },
    24: {
      id: 24,
      title: "Truck Loader 3",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/06/Truck-Loader-3-e1718344209874.webp",
    },
    25: {
      id: 25,
      title: "Crazy Cars",
      image: "https://littlegames.gg/wp-content/uploads/2024/05/Crazy-Cars.jpg",
    },
    26: {
      id: 26,
      title: "Pool Club",
      image: "https://littlegames.gg/wp-content/uploads/2024/06/Pool-Club.webp",
    },
    27: {
      id: 27,
      title: "Jumping Shell",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/06/Jumping-Shell.webp",
    },
    28: {
      id: 28,
      title: "Doodle Baseball",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/09/Doodle-Baseball.png",
    },
    29: {
      id: 29,
      title: "Temple of Boom",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/05/Temple-of-Boom.webp",
    },
    30: {
      id: 30,
      title: "Ludo Classic",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/03/Ludo-Classic.jpg",
    },
    31: {
      id: 31,
      title: "Toca Life Adventure",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/512x384-1074.jpg",
    },
    32: {
      id: 32,
      title: "Tic Tac Toe Vegas",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/512x384-1865.jpg",
    },
    33: {
      id: 33,
      title: "Sports MiniBattles",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/512x384-1793.jpg",
    },
    34: {
      id: 34,
      title: "Zombie Mission 5",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/512x384-1763.jpg",
    },
    35: {
      id: 35,
      title: "Stick Fighter 3D",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/512x384-1361.jpg",
    },
    36: {
      id: 36,
      title: "HighwayTraffic",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/03/Highway-Traffic.jpg",
    },
    37: {
      id: 37,
      title: "UNO Card Game",
      image: "https://littlegames.gg/wp-content/uploads/2024/04/image-60.webp",
    },
    38: {
      id: 38,
      title: "Gulper.io",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/512x384-1819.jpg",
    },
    39: {
      id: 39,
      title: "Watermelon Drop",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/Watermelon-drop.jpg",
    },
    40: {
      id: 40,
      title: "Ballon Slicer Game",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/Balloon-Slicer-Game.jpg",
    },
    41: {
      id: 41,
      title: "Squid Game.io",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/Squid-Game.io_.jpg",
    },
    42: {
      id: 42,
      title: "Mountain Bike Racer",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/05/Mountain-Bike-Racer.webp",
    },
    43: {
      id: 43,
      title: "Fury Wars",
      image: "https://littlegames.gg/wp-content/uploads/2024/05/Fury-Wars.jpg",
    },
  };

  // Featured games for sidebar (first 8)
  const featuredGames = Object.values(gameData).slice(0, 8);
  // All games
  const allGames = Object.values(gameData);

  useEffect(() => {
    const matchedGame = Object.values(gameData).find(
      (g) => generateSlug(g.title) === slug
    );

    if (matchedGame) {
      setGame(matchedGame);
    } else {
      setGame({
        title: "Hills of steel",
        image:
          "https://littlegames.gg/wp-content/uploads/2024/05/Hills-of-Steel-.webp",
      });
    }
    setLoading(false);
  }, [slug]);

  // Generate dummy description
  const generateDescription = (title) => {
    return `${title} is an exhilarating online multiplayer game that blends strategic thinking with fast-paced action. Players from around the world compete in real-time battles, testing their reflexes and tactical skills.  
  
  The game boasts stunning visuals with a unique art style optimized for smooth performance across all devices. Immersive sound design enhances the experience, providing dynamic audio cues during intense moments.  
  
  Its intuitive controls make it easy for newcomers to jump in, while experienced players can master advanced techniques. The rewarding progression system allows players to customize characters and unlock new gear.  
  
  Regular updates bring fresh content, seasonal events, and limited-time game modes to keep the gameplay engaging. Developers actively listen to community feedback, ensuring balanced mechanics and exciting new features.  
  
  With multiple game modes, including casual and competitive ranked matches, ${title} caters to all playstyles. A fair matchmaking system ensures balanced competition, making every battle both thrilling and rewarding.  
  
  Join millions of players worldwide and experience the adrenaline-pumping action of ${title} today!`;
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      if (hasDisliked) {
        setDislikes((prev) => prev - 1);
        setHasDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (!hasDisliked) {
      setDislikes((prev) => prev + 1);
      setHasDisliked(true);
      if (hasLiked) {
        setLikes((prev) => prev - 1);
        setHasLiked(false);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      gameContainerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const reloadGame = () => {
    const iframe = iframeRef.current;
    const currentSrc = iframe.src;
    iframe.src = "about:blank";
    setTimeout(() => {
      iframe.src = currentSrc;
    }, 100);
  };

  const formatNumber = (num) => {
    return (num / 1000000).toFixed(1) + "M";
  };


  
  const closeCookiesBar = () => {
    setShowCookiesBar(false);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-[#1a1b28]">
        <div className="text-2xl font-bold text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-900">
      <Navbar />

      {/* Main Container with 70-30 Split */}
      <div className="flex flex-col md:flex-row pt-20 px-4 md:space-x-4 max-w-screen-2xl mx-auto">
        {/* Left Side Game Content (70%) */}
        <div className="w-full md:w-[70%]">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            {/* Game Wrapper - This enters Fullscreen Mode */}
            <div ref={gameContainerRef} className="relative w-full">
              {/* Game Container */}
              <div className="aspect-video w-full">
                <iframe
                  ref={iframeRef}
                  src="https://1v1.lol/"
                  title={game?.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>

              {/* Persistent Control Bar */}
              <div
                className={`${
                  isFullscreen
                    ? "fixed bottom-0 left-0 right-0 bg-[#28293d] text-white z-50"
                    : "relative text-white bg-[#28293d]"
                } flex items-center justify-between px-4 py-2`}
              >
                {/* Left Side - Game Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={game?.image}
                    alt={game?.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="font-bold text-lg text-white">
                      {game?.title}
                    </h2>
                  </div>
                </div>

                {/* Right Side - Controls */}
                <div className="flex items-center gap-2">
                  {/* Like Button */}
                  <div className="relative group">
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-1 px-1 py-2 bg-[#474967] rounded-md transition-colors hover:bg-[#474967] ${
                        hasLiked
                          ? "text-green-500"
                          : "text-white hover:text-green-500"
                      }`}
                    >
                      <ThumbsUp size={20} />
                      <span className="text-sm font-medium">
                        {formatNumber(likes)}
                      </span>
                    </button>
                    <span className="absolute left-1/2 transform -translate-x-1/2 -top-8 scale-0 group-hover:scale-100 transition bg-[#474967] text-white text-xs rounded-md px-2 py-1">
                      Like
                    </span>
                  </div>

                  {/* Dislike Button */}
                  <div className="relative group">
                    <button
                      onClick={handleDislike}
                      className={`flex items-center gap-1 px-1 py-2 bg-[#474967] rounded-md transition-colors hover:bg-[#474967] ${
                        hasDisliked
                          ? "text-red-500"
                          : "text-white hover:text-red-500"
                      }`}
                    >
                      <ThumbsDown size={20} />
                      <span className="text-sm font-medium">
                        {formatNumber(dislikes)}
                      </span>
                    </button>
                    <span className="absolute left-1/2 transform -translate-x-1/2 -top-8 scale-0 group-hover:scale-100 transition bg-[#474967] text-white text-xs rounded-md px-2 py-1">
                      Dislike
                    </span>
                  </div>

                  <div className="relative group">
                    <button
                      onClick={() => setOpen(true)} 
                      className="flex items-center px-2 py-2 bg-[#474967] rounded-md text-white transition-colors hover:bg-[#474967] hover:text-blue-400"
                    >
                      <FaRegHeart size={20} />
                    </button>
                    <span className="absolute left-1/2 transform -translate-x-1/2 -top-8 scale-0 group-hover:scale-100 transition bg-[#474967] text-white text-xs rounded-md px-2 py-1">
                      Favorite
                    </span>
                  </div>

                  {/* Reload Button */}
                  <div className="relative group">
                    <button
                      onClick={reloadGame}
                      className="flex items-center px-2 py-2 bg-[#474967] rounded-md text-white transition-colors hover:bg-[#474967] hover:text-blue-400"
                    >
                      <RefreshCw size={20} />
                    </button>
                    <span className="absolute left-1/2 transform -translate-x-1/2 -top-8 scale-0 group-hover:scale-100 transition bg-[#474967] text-white text-xs rounded-md px-2 py-1">
                      Reload
                    </span>
                  </div>

                  {/* Fullscreen Button */}
                  <div className="relative group">
                    <button
                      onClick={toggleFullscreen}
                      className="flex items-center px-2 py-2 bg-[#474967] rounded-md text-white transition-colors hover:bg-[#474967] hover:text-blue-400"
                    >
                      {isFullscreen ? (
                        <Minimize2 size={20} />
                      ) : (
                        <Maximize2 size={20} />
                      )}
                    </button>
                    <span className="absolute left-1/2 transform -translate-x-1/2 -top-8 scale-0 group-hover:scale-100 transition bg-[#474967] text-white text-xs rounded-md px-2 py-1">
                      {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <GameStats gameTitle={game?.title} />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2 ml-5 shadow-gray-600 bg-gray-900">
              <span className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">
                Action
              </span>
              <span className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">
                Multiplayer
              </span>
              <span className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">
                Strategy
              </span>
              <span className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">
                Battle Royale
              </span>
            </div>

            {/* Description Section */}
            <div className="pt-4 px-6 mb-10 bg-gray-900 text-white">
              {/* Title */}
              <h2 className="text-2xl font-bold mb-4 text-left">
                About {game?.title}
              </h2>

              {/* Image */}
              <div className="w-full md:w-60 mb-4">
                <img
                  src={game?.image}
                  alt={`${game?.title} Gameplay`}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>

              {/* Description */}
              <div className="text-gray-300 text-lg leading-loose text-left">
                {generateDescription(game?.title)}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[30%] mt-6 md:mt-0">
          <div className="rounded-2xl overflow-hidden shadow-xl bg-[#1a1b28] text-white p-4">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-center mb-2">More Games</h2>
              <div className="h-1 w-16 bg-blue-500 mx-auto"></div>
            </div>

            {/* Games Grid - Displays All 43 Games */}
            <div className="grid grid-cols-2 gap-3">
              {allGames.map((game) => (
                <a
                  key={game.id}
                  href={`/game/${generateSlug(game.title)}`}
                  className="block transition-transform hover:scale-105 relative group"
                >
                  <div className="rounded-lg overflow-hidden relative aspect-w-1 aspect-h-1">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Light black shadow effect over title on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black to-transparent"></div>
                      <p className="relative text-xs font-medium text-white text-center z-10">
                        {game.title}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <GameTabs open={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
};

export default GamePage;