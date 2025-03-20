import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ThumbsUp, ThumbsDown, Maximize2, Minimize2 } from "lucide-react";

const GameEmbed = () => {
  const { slug } = useParams();
  const [likes, setLikes] = useState(1200000);
  const [dislikes, setDislikes] = useState(100000);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Track if the game is playing
  const gameContainerRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.width = "100%";
    document.documentElement.style.height = "100%";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
  }, []);

  const gameData = {
    "hills-of-steel": {
      title: "Hills of Steel",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/05/Hills-of-Steel-.webp",
    },
    "shell-shockers": {
      title: "Shell Shockers",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/04/shell-shocker.webp",
    },
    "smash-carts": {
      title: "Smash Carts",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2023/11/image-12.jpg",
    },
    "car-stunts": {
      title: "Car Stunts",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/06/Vectaria.io_.webp",
    },
    "stick-defenders": {
      title: "Stick Defenders",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/07/Stick-Defenders.webp",
    },
    "cowardle-multiplayer": {
      title: "CoWardle Multiplayer",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/04/CoWordle.webp",
    },
    "fruit-ninja": {
      title: "Fruit Ninja",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/01/512x384-417.jpg",
    },
    "basketball-legends": {
      title: "Basketball Legends",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/01/512x384-1309.jpg",
    },
    "infinite-craft": {
      title: "Infinite Craft",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/08/Infinite-Craft.webp",
    },
    "stick-merge": {
      title: "Stick Merge",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/07/Stick-Merge.webp",
    },
    "jetpack-joyride": {
      title: "Jetpack Joyride",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2023/12/Snow-Rider-3D.webp",
    },
    "chill-climb-racing": {
      title: "Chill Climb Racing",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/05/Shark-io.webp",
    },
    "among-us": {
      title: "Among Us",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/07/Merge-Arena.webp",
    },
    "cut-the-rope": {
      title: "Cut the Rope",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/07/Google-Snake.webp",
    },
    "angry-birds": {
      title: "Angry Birds",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/07/Shovel-Pirate.webp",
    },
    "crossy-road": {
      title: "Crossy Road",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/06/Doodle-Jump.webp",
    },
    "crazy-cars": {
      title: "Crazy Cars",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/05/Crazy-Cars.jpg",
    },
    "blumgi-ball": {
      title: "Blumgi Ball",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/07/Blumgi-Ball.webp",
    },
    "rolling-sky": {
      title: "Rolling Sky",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/07/Rolling-Sky.webp",
    },
    "driftwave": {
      title: "Driftwave",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/07/Driftwave.webp",
    },
    "paper-io-2": {
      title: "Paper.io 2",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2023/12/image-59.webp",
    },
    "gunspin": {
      title: "Gunspin",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2023/12/image-13.jpg",
    },
    "hill-climb-racing-2": {
      title: "Hill Climb Racing 2",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2023/12/hill-climb-racing-2.webp",
    },
    "truck-loader-3": {
      title: "Truck Loader 3",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/06/Truck-Loader-3-e1718344209874.webp",
    },
    "pool-club": {
      title: "Pool Club",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/06/Pool-Club.webp",
    },
    "jumping-shell": {
      title: "Jumping Shell",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/06/Jumping-Shell.webp",
    },
    "doodle-baseball": {
      title: "Doodle Baseball",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/09/Doodle-Baseball.png",
    },
    "temple-of-boom": {
      title: "Temple of Boom",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/05/Temple-of-Boom.webp",
    },
    "ludo-classic": {
      title: "Ludo Classic",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/03/Ludo-Classic.jpg",
    },
    "toca-life-adventure": {
      title: "Toca Life Adventure",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/01/512x384-1074.jpg",
    },
    "tic-tac-toe-vegas": {
      title: "Tic Tac Toe Vegas",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/01/512x384-1865.jpg",
    },
    "sports-minibattles": {
      title: "Sports MiniBattles",
      url: "https://1v1.lol/",
      image: "https://littlegames.gg/wp-content/uploads/2024/01/512x384-1793.jpg",
    },
  };
  
  const game = gameData[slug] || {
    title: "Hills of Steel",
    url: "https://example.com",
    image: "https://littlegames.gg/wp-content/uploads/2024/05/Hills-of-Steel-.webp",
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
      if (hasDisliked) {
        setDislikes(dislikes - 1);
        setHasDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (!hasDisliked) {
      setDislikes(dislikes + 1);
      setHasDisliked(true);
      if (hasLiked) {
        setLikes(likes - 1);
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

  return (
    <div className="fixed inset-0 w-full h-full">
      {/* Game Frame */}
      <iframe
        ref={gameContainerRef}
        src={isPlaying ? game.url : "about:blank"} // Load game only when "Play Now" is clicked
        title={game.title}
        className="fixed inset-0 w-full h-full"
        frameBorder="0"
        allowFullScreen
      ></iframe>

      {!isPlaying && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <img src={game.image} alt={game.title} className="w-48 h-28 rounded-xl shadow-lg" />
          <h2 className="text-white text-3xl font-bold mt-4">{game.title}</h2>
          <button
            onClick={() => setIsPlaying(true)} // Start game in iframe
            className="mt-4 px-6 py-3 bg-purple-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-purple-700 transition"
          >
            Play Now ▶
          </button>
        </div>
      )}

      {/* Control Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-[#28293d] bg-opacity-90 px-6 py-3 flex items-center justify-between">
        {/* Left: Game Info */}
        <div className="flex items-center gap-10">
          <img src={game.image} alt={game.title} className="w-10 h-10 rounded-md" />
          <span className="text-white font-semibold text-lg">{game.title}</span>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-6 text-white">
          <button onClick={handleLike} className={`flex items-center gap-2 ${hasLiked ? "text-green-400" : ""}`}>
            <ThumbsUp size={20} />
            <span>{(likes / 1000000).toFixed(1)}M</span>
          </button>
          <button onClick={handleDislike} className={`flex items-center gap-2 ${hasDisliked ? "text-red-400" : ""}`}>
            <ThumbsDown size={20} />
            <span>{(dislikes / 1000).toFixed(0)}K</span>
          </button>
          <button onClick={toggleFullscreen} className="text-white">
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameEmbed;

