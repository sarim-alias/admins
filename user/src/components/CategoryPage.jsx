import React from "react";
import { useParams, Link } from "react-router-dom";
import GamePage from "./GamePage";

// Sample game data (Replace with API data)
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

const CategoryPage = () => {
  const { category } = useParams();

  // Normalize category string to match data
  const normalizedCategory = category.trim().toLowerCase();

  // Filter games based on normalized category
  const filteredGames = games.filter(
    (game) => game.category.toLowerCase() === normalizedCategory
  );

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 mt-12 capitalize">
        {category} Games
      </h1>
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredGames.map((game) => (
            <Link
              key={game.id}
              to={`/game/${game.id}`}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              {/* Game Image */}
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-40 object-cover"
              />

              {/* Shiny Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent scale-x-0 transition-transform duration-700 origin-left group-hover:scale-x-100" />

              {/* Title appears on hover */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-sm font-bold text-center">
                  {game.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No games found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
