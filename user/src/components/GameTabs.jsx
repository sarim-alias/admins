import { useState, useEffect } from "react";
import { Drawer, Tabs } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { FaTimesCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import SignupModel from "./SignupModel.jsx"; // Import SignupModel

const GameTabs = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState("favorites");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false); // State to manage SignupModel



  const recentGames = [
    {
      title: "Hills of Steel",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/05/Hills-of-Steel-.webp",
    },
    {
      title: "Shell Shockers",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/04/shell-shocker.webp",
    },
    {
      title: "Smash Carts",
      image: "https://littlegames.gg/wp-content/uploads/2023/11/image-12.jpg",
    },
    {
      title: "Vectaria",
      image:
        "https://littlegames.gg/wp-content/uploads/2024/06/Vectaria.io_.webp",
    },
  ];

  // State for Liked Games
  const [likedGames, setLikedGames] = useState([
    { title: "Game 1", image: "https://example.com/game1.jpg" },
    { title: "Game 2", image: "https://example.com/game2.jpg" },
  ]);

  return (
    <>
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        width={400}
        className="bg-[#28293d]"
        style={{ backgroundColor: "#28293d", color: "white" }}
      >
        <div className="absolute top-4 right-4">
          <CloseOutlined
            className="text-white text-2xl cursor-pointer"
            onClick={onClose}
          />
        </div>

        <div className="p-6 pt-10">
          <h3 className="text-center text-white font-bold text-xl mb-4">
            My Games
          </h3>

          <Tabs
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key)}
            centered
            tabBarGutter={10} // Reduced gap between tabs
            tabBarStyle={{ borderBottom: "none" }}
            className="custom-tabs"
          >
            <Tabs.TabPane
              tab={
                <span
                  className={
                    activeTab === "recent" ? "text-white" : "text-gray-400"
                  }
                >
                  Recent
                </span>
              }
              key="recent"
            >
              <GameList games={recentGames} />
            </Tabs.TabPane>

            <Tabs.TabPane
              tab={<span className={activeTab === "favorites" ? "text-white" : "text-gray-400"}>Favorites</span>}
              key="favorites"
            >
              {isLoggedIn ? (
                <GameList games={[]} />
              ) : (
                <LoginPrompt activeTab="favorites" setSignupOpen={setSignupOpen} />
              )}
            </Tabs.TabPane>

            <Tabs.TabPane
              tab={
                <span
                  className={
                    activeTab === "liked" ? "text-white" : "text-gray-400"
                  }
                >
                  Liked
                </span>
              }
              key="liked"
            >
              {isLoggedIn ? (
                <GameList games={likedGames} />
              ) : (
                <LoginPrompt activeTab="liked" setSignupOpen={setSignupOpen} />
              )}
            </Tabs.TabPane>
          </Tabs>

          {isLoggedIn && (
            <button
              className="mt-6 w-full bg-red-500 text-white py-2 rounded-full font-medium transition hover:bg-red-600"
              onClick={() => setIsLoggedIn(false)}
            >
              Sign Out
            </button>
          )}
        </div>
      </Drawer>

      {/* Signup Model Drawer */}
      <SignupModel open={signupOpen} setOpen={setSignupOpen} />
    </>
  );
};

const GameList = ({ games }) => (
  <div className="flex flex-wrap gap-2 p-2">
    {games.length > 0 ? (
      games.map((game, index) => (
        <div key={index} className="relative">
          <img
            src={game.image}
            alt={game.title}
            className="w-32 h-20 rounded-md object-cover"
          />
          <FaTimesCircle className="absolute top-1 right-1 text-red-500 cursor-pointer text-xl" />
        </div>
      ))
    ) : (
      <p className="text-center text-gray-400 w-full">No games found.</p>
    )}
  </div>
);

// Gradient Heart Component
const GradientHeart = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="url(#gradientColor)"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="gradientColor" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff68b4" />
        <stop offset="100%" stopColor="#ff40a1" />
      </linearGradient>
    </defs>
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="url(#gradientColor)"
    />
  </svg>
);

const LoginPrompt = ({ activeTab, setSignupOpen }) => {
  return (
    <div className="flex flex-col items-center text-white p-2">
      {/* Show different icons for Liked and Favorites */}
      {activeTab === "liked" ? (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="url(#thumbGradient)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="thumbGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          <path
            d="M2 10H4V21H2V10M23 11C23 9.9 22.1 9 21 9H15.31L16.4 4.86L16.43 4.44C16.43 4.18 16.33 3.93 16.16 3.73L15.42 3L9.83 8.59C9.59 8.83 9.46 9.16 9.46 9.5V19C9.46 20.1 10.36 21 11.46 21H18C18.77 21 19.42 20.59 19.75 19.97L22.92 13.56C22.97 13.38 23 13.19 23 13V11Z"
            fill="url(#thumbGradient)"
          />
        </svg>
      ) : (
        <GradientHeart />
      )}

      {/* Show different headings for Liked and Favorites */}
      <h4 className="mt-4 font-bold text-lg text-center">
        {activeTab === "liked"
          ? "Create an account to see all your liked games"
          : "Create an account to add games to your favorites"}
      </h4>

      <button className="w-full flex items-center justify-center bg-white text-black py-2 rounded-full font-medium mt-6 shadow-md hover:bg-gray-200 transition">
        <FcGoogle className="text-xl mr-2" />
        Sign in with Google
      </button>

      <button className="w-full flex items-center justify-center bg-[#1877f2] text-white py-2 rounded-full font-medium mt-3 shadow-md hover:bg-[#166fe5] transition">
        <FaFacebook className="text-xl mr-2" />
        Continue with Facebook
      </button>

      <div className="flex items-center my-6 w-full">
        <hr className="flex-1 border-gray-600" />
        <span className="px-3 text-gray-400 text-center">OR</span>
        <hr className="flex-1 border-gray-600" />
      </div>

      <input
        type="email"
        placeholder="Enter your email"
        className="custom-input w-full p-3 bg-[#3b3c54] border-none text-white rounded-md placeholder-gray-400 focus:outline-none"
      />

      <input
        type="password"
        placeholder="Enter your password"
        className="custom-input w-full p-3 mt-3 bg-[#3b3c54] border-none text-white rounded-md placeholder-gray-400 focus:outline-none"
      />

      <button className="mt-4 w-full py-2 rounded-full text-white font-medium transition bg-[#4f46e5] cursor-pointer">
        Continue
      </button>

      <p className="text-center text-gray-400 mt-4 text-sm">
        Don’t have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => setSignupOpen(true)}
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

export default GameTabs;

