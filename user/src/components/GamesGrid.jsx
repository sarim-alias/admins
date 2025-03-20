import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import GameIcon from "../assets/games.jpg";
import InstallIcon from "../assets/install.jpg";
import DeviceIcon from "../assets/device.jpg";
import FreeIcon from "../assets/free.jpg";

const generateSlug = (title) =>
  title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const GamesGrid = ({ searchQuery = "" }) => {
  const navigate = useNavigate();
  const carouselRefs = useRef({});

  const handleGameClick = (game) => {
    const slug = generateSlug(game.title);
    navigate(`/game/${slug}`);
  };

  const scrollCarousel = (category, direction) => {
    const scrollAmount = 240 * 6; // Move by 6 game widths
    if (carouselRefs.current[category]) {
      carouselRefs.current[category].scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const games = [
    {
      id: 1,
      title: "Hills of Steel",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/05/Hills-of-Steel-.webp",
      hot: true,
      category: "Driving",
    },
    {
      id: 2,
      title: "Shell Shockers",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/04/shell-shocker.webp",
      featured: true,
      category: "Featured",
    },
    {
      id: 3,
      title: "Smash Carts",
      image: "https://littlegames.gg/wp-content/uploads/2023/11/image-12.jpg",
      category: "Driving",
    },
    {
      id: 4,
      title: "Vectaria",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/06/Vectaria.io_.webp",
      hot: true,
      category: "Casual",
    },
    {
      id: 5,
      title: "Stick Defenders",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/07/Stick-Defenders.webp",
      category: "Casual",
    },
    {
      id: 6,
      title: "CoWardle Multiplayer",
      image: "https://littlegames.gg/wp-content/uploads/2024/04/CoWordle.webp",
      featured: true,
      category: "Featured",
    },
    {
      id: 7,
      title: "Fruit Ninja",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/512x384-417.jpg",
      hot: true,
      category: "Driving",
    },
    {
      id: 8,
      title: "Basketball Legends",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/512x384-1309.jpg",
      featured: true,
      category: "Featured",
    },
    {
      id: 9,
      title: "Infinite Craft",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/08/Infinite-Craft.webp",
      category: "Driving",
    },
    {
      id: 10,
      title: "Stick Merge",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/07/Stick-Merge.webp",
      hot: true,
      category: "Casual",
    },
    {
      id: 11,
      title: "Jetpack Joyride",
      image:
        "https://littlegames.gg/wp-content/uploads/2023/12/Snow-Rider-3D.webp",
      category: "Casual",
    },
    {
      id: 12,
      title: "Chill Climb Racing",
      image: "https://littlegames.gg/wp-content/uploads/2024/05/Shark-io.webp",
      featured: true,
      category: "Featured",
    },
    {
      id: 13,
      title: "Among Us",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/07/Merge-Arena.webp",
      hot: true,
      category: "Driving",
    },
    {
      id: 14,
      title: "Cut the Rope",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/07/Google-Snake.webp",
      featured: true,
      category: "Featured",
    },
    {
      id: 15,
      title: "Angry Birds",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/07/Shovel-Pirate.webp",
      category: "Driving",
    },
    {
      id: 16,
      title: "Crossy Road",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/06/Doodle-Jump.webp",
      hot: true,
      category: "Casual",
    },
    {
      id: 17,
      title: "Crazy Cars",
      image: "https://littlegames.gg/wp-content/uploads/2024/05/Crazy-Cars.jpg",
      category: "Casual",
    },
    {
      id: 18,
      title: "Blumgi Ball",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/07/Blumgi-Ball.webp",
      featured: true,
      category: "Featured",
    },
    {
      id: 19,
      title: "Rolling Sky",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/07/Rolling-Sky.webp",
      category: "New",
    },
    {
      id: 20,
      title: "Driftwave",
      image: "https://littlegames.gg/wp-content/uploads/2024/07/Driftwave.webp",
      featured: true,
      category: "New",
    },
    {
      id: 21,
      title: "Paper.io 2",
      image: "https://littlegames.gg/wp-content/uploads/2023/12/image-59.webp",
      hot: true,
      category: "New",
    },
    {
      id: 22,
      title: "Gunspin",
      image: "https://littlegames.gg/wp-content/uploads/2023/12/image-13.jpg",
      featured: true,
      category: "New",
    },
    {
      id: 23,
      title: "Hill Climb Racing 2",
      image:
        "https://littlegames.gg/wp-content/uploads/2023/12/hill-climb-racing-2.webp",
      category: "New",
    },
    {
      id: 24,
      title: "Truck Loader 3",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/06/Truck-Loader-3-e1718344209874.webp",
      hot: true,
      category: "New",
    },
    {
      id: 25,
      title: "Crazy Cars",
      image: "https://littlegames.gg/wp-content/uploads/2024/05/Crazy-Cars.jpg",
      category: "Casual",
    },
    {
      id: 26,
      title: "Pool Club",
      image: "https://littlegames.gg/wp-content/uploads/2024/06/Pool-Club.webp",
      featured: true,
      category: "Featured",
    },
    {
      id: 27,
      title: "Jumping Shell",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/06/Jumping-Shell.webp",
      category: "Featured",
    },
    {
      id: 28,
      title: "Doodle Baseball",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/09/Doodle-Baseball.png",
      featured: true,
      category: "Featured",
    },
    {
      id: 29,
      title: "Temple of Boom",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/05/Temple-of-Boom.webp",
      category: "2 Player",
    },
    {
      id: 30,
      title: "Ludo Classic",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/03/Ludo-Classic.jpg",
      hot: true,
      category: "2 Player",
    },
    {
      id: 31,
      title: "Toca Life Adventure",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/512x384-1074.jpg",
      category: "Casual",
    },
    {
      id: 32,
      title: "Tic Tac Toe Vegas",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/512x384-1865.jpg",
      featured: true,
      category: "New",
    },
    {
      id: 33,
      title: "Sports MiniBattles",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/512x384-1793.jpg",
      category: "New",
    },
    {
      id: 34,
      title: "Zombie Mission 5",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/512x384-1763.jpg",
      featured: true,
      category: "Driving",
    },
    {
      id: 35,
      title: "Stick Fighter 3D",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/512x384-1361.jpg",
      featured: true,
      category: "Driving",
    },
    {
      id: 35,
      title: "Ludo Wars",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/512x384-899.jpg",
      featured: true,
      category: "Driving",
    },
    {
      id: 36,
      title: "Highway Traffic",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/03/Highway-Traffic.jpg",
      featured: true,
      category: "2 Player",
    },
    {
      id: 37,
      title: "Mini Golf Club",
      image: "https://littlegames.gg/wp-content/uploads/2024/04/image-60.webp",
      featured: true,
      category: "2 Player",
    },
    {
      id: 38,
      title: "Gulper.io",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/512x384-1819.jpg",
      featured: true,
      category: "2 Player",
    },
    {
      id: 39,
      title: "Watermelon Drop",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/Watermelon-drop.jpg",
      featured: true,
      category: "2 Player",
    },
    {
      id: 40,
      title: "Ballon Slicer Game",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/Balloon-Slicer-Game.jpg",
      featured: true,
      category: "2 Player",
    },
    {
      id: 41,
      title: "Squid Game.io",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/01/Squid-Game.io_.jpg",
      featured: true,
      category: "2 Player",
    },
    {
      id: 42,
      title: "Mountain Bike Racer",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/05/Mountain-Bike-Racer.webp",
      featured: true,
      category: "2 Player",
    },
    {
      id: 43,
      title: "Fury Wars",
      image: "https://littlegames.gg/wp-content/uploads/2024/05/Fury-Wars.jpg",
      featured: true,
      category: "2 Player",
    },
  ];

  const categories = ["Featured", "New", "Driving", "Casual", "2 Player"];

  return (
    <div className="p-6 pt-16">
      {/* Hero Banner */}
      <div className="bg-gray-900 mb-6 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Features Section */}
          <div className="flex w-full justify-between text-lg text-white gap-24">
            <div className="flex items-center justify-center flex-1">
              <img
                src={GameIcon}
                alt="Games"
                className="w-12 h-12 mr-4 rounded-full bg-[#121212]"
              />
              <span className="text-lg">4000+ games</span>
            </div>
            <div className="flex items-center justify-center flex-1">
              <img
                src={InstallIcon}
                alt="No Install"
                className="w-12 h-12 mr-4 rounded-full"
              />
              <span className="text-lg">No install needed</span>
            </div>
            <div className="flex items-center justify-center flex-1">
              <img
                src={DeviceIcon}
                alt="Devices"
                className="w-12 h-12 mr-4 rounded-full"
              />
              <span className="text-lg">On any device</span>
            </div>
            <div className="flex items-center justify-center flex-1">
              <img
                src={FreeIcon}
                alt="Free"
                className="w-12 h-12 mr-4 rounded-full"
              />
              <span className="text-lg">All for free</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Games Section */}
      <div className="mb-6">
        <div className="grid grid-cols-7 gap-4 auto-rows-[90px] md:auto-rows-[120px] lg:auto-rows-[120px]">
          {games
            .reduce((rows, game, index) => {
              let row = rows[rows.length - 1];

              if (!row || row.length >= 7) {
                row = [];
                rows.push(row);
              }

              const remainingSpace = 7 - row.length;

              // Place a large block only if there's enough space (2 slots left in row)
              const isLargeBlock = remainingSpace >= 2 && index % 9 === 0;

              if (isLargeBlock) {
                row.push({ ...game, spanClass: "col-span-2 row-span-2" });
              } else {
                row.push({ ...game, spanClass: "col-span-1 row-span-1" });
              }

              return rows;
            }, [])
            .flatMap((row) => row)
            .map((game) => (
              <div
                key={game.id}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 ${game.spanClass}`}
                onClick={() => handleGameClick(game)}
              >
                {/* Game Image */}
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />

                {/* Shiny Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent scale-x-0 transition-transform duration-700 origin-left group-hover:scale-x-100" />

                {/* Title (Hidden by Default, Appears on Hover) */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="text-white text-sm font-bold text-center truncate">
                    {game.title}
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </div>

{/* Game Categories with Carousel */}
{categories.map((category) => {
  const categoryGames = games.filter((game) => game.category === category);
  return (
    <div key={category} className="mb-6 relative">
      {/* Category Title with View More */}
      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-xl font-bold text-white">{category} Games</h2>
        <Link
          to={`/category/${category.toLowerCase()}`}
          className="text-purple-400 text-sm transition-colors duration-300 hover:text-blue-500 no-underline"
        >
          View more
        </Link>
      </div>

      <div className="relative">
        {categoryGames.length > 6 && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
            onClick={() => scrollCarousel(category, "left")}
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <div
          className="flex gap-4 overflow-hidden relative"
          ref={(el) => (carouselRefs.current[category] = el)}
          style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "auto",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
          }}
        >
          {categoryGames.map((game) => (
            <div
              key={game.id}
              className="group relative min-w-[220px] max-w-[220px] bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => handleGameClick(game)}
            >
              {/* Game Image */}
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover"
              />

              {/* Shiny Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent scale-x-0 transition-transform duration-700 origin-left group-hover:scale-x-100" />

              {/* Title appears on hover */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-sm font-bold text-center">
                  {game.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        {categoryGames.length > 6 && (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
            onClick={() => scrollCarousel(category, "right")}
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
})}
    </div>
  );
};

export default GamesGrid;
