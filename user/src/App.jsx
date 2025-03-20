import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GamesGrid from "./components/GamesGrid";
import GamePage from "./components/GamePage";
import CategoryPage from "./components/CategoryPage";
import GameEmbed from "./components/GameEmbed";
import SignupModel from "./components/SignupModel";
import { Toaster } from "react-hot-toast";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [switchToSignup, setSwitchToSignup] = useState(false);
  
  const location = useLocation();
  const isEmbedPage = location.pathname.startsWith("/embed/");

  useEffect(() => {
    if (!isLoginOpen && switchToSignup) {
      setIsSignupOpen(true);
      setSwitchToSignup(false);
    }
  }, [isLoginOpen, switchToSignup]);

  useEffect(() => {
    const applyZoomBackground = () => {
      document.documentElement.style.backgroundColor = "#121212";
      document.body.style.backgroundColor = "#121212";
    };

    window.addEventListener("resize", applyZoomBackground);
    window.addEventListener("load", applyZoomBackground);

    return () => {
      window.removeEventListener("resize", applyZoomBackground);
      window.removeEventListener("load", applyZoomBackground);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Toaster for toast notifications */}
      <Toaster position="top-center" />
      {!isEmbedPage && <Navbar onSearch={setSearchQuery} onLogin={() => setIsLoginOpen(true)} />}
      
      <div className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<GamesGrid searchQuery={searchQuery} />} />
          <Route path="/game/:slug" element={<GamePage />} />
          <Route path="/gamegrid" element={<GamesGrid searchQuery={searchQuery} />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/embed/:slug" element={<GameEmbed />} />
        </Routes>
      </div>

      {!isEmbedPage && <Footer />}

      {/* Signup Modal */}
      <SignupModel 
        open={isSignupOpen} 
        setOpen={setIsSignupOpen} 
        setLoginOpen={setIsLoginOpen} 
      />
    </div>
  );
}

export default App;


