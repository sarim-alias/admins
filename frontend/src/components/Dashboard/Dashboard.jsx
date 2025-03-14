import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = () => {
  const [games, setGames] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState({ title: "", description: "", iframeUrl: "", category: "", imageUrl: "" });

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/games");
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const openEditModal = (game) => {
    setCurrentGame(game);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this game?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/games/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        toast.success("Game deleted successfully! 🚀");
        fetchGames();
      } else {
        const data = await response.json();
        toast.error(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error deleting game:", error);
      toast.error("Something went wrong! ❌");
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", currentGame.title);
      formData.append("description", currentGame.description);
      formData.append("iframeUrl", currentGame.iframeUrl);
      formData.append("category", currentGame.category);
      
      if (currentGame.imageFile) {
        formData.append("image", currentGame.imageFile);
      }

      const response = await fetch(`http://localhost:5000/api/games/${currentGame._id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Game updated successfully! 🎮");
        fetchGames();
        setIsModalOpen(false);
      } else {
        toast.error(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error updating game:", error);
      toast.error("Something went wrong! ❌");
    }
  };

  return (
    <div className="relative min-h-screen p-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-xl text-white font-semibold">Dashboard ⭐</h1>

      <div className="mt-4">
        {games.map((game) => (
          <div key={game._id} className="flex items-center bg-gray-800 p-4 rounded-lg mb-4">
            <img src={game.imageUrl} alt={game.title} className="w-20 h-20 object-cover rounded-md mr-4" />
            <div className="flex-1">
              <h2 className="text-white font-semibold">{game.title}</h2>
              <p className="text-gray-400 text-sm">{game.description}</p>
            </div>
            <button onClick={() => openEditModal(game)} className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2">
              Edit
            </button>
            <button onClick={() => handleDelete(game._id)} className="bg-red-500 text-white px-3 py-1 rounded-md">
              Delete
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal bg-gray-900 p-5 rounded-lg">
  <h2 className="text-xl text-white mb-4">Edit Game</h2>
  <input
    type="text"
    value={currentGame.title}
    onChange={(e) => setCurrentGame({ ...currentGame, title: e.target.value })}
    className="w-full p-2 border rounded bg-gray-700 text-white mb-2"
    placeholder="Title"
  />
  <textarea
    value={currentGame.description}
    onChange={(e) => setCurrentGame({ ...currentGame, description: e.target.value })}
    className="w-full p-2 border rounded bg-gray-700 text-white mb-2"
    placeholder="Description"
  ></textarea>
  <input
    type="text"
    value={currentGame.iframeUrl}
    onChange={(e) => setCurrentGame({ ...currentGame, iframeUrl: e.target.value })}
    className="w-full p-2 border rounded bg-gray-700 text-white mb-2"
    placeholder="iFrame URL"
  />
  
  {/* Dropdown for Category */}
  <select
    value={currentGame.category}
    onChange={(e) => setCurrentGame({ ...currentGame, category: e.target.value })}
    className="w-full p-2 border rounded bg-gray-700 text-white mb-2"
  >
    <option value="" disabled>Select Category</option>
    {["Featured", "New", "Driving", "Casual", "2 Player"].map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
  </select>

  <input
    type="file"
    onChange={(e) => setCurrentGame({ ...currentGame, imageFile: e.target.files[0] })}
    className="w-full p-2 border rounded bg-gray-700 text-white mb-2"
  />
  <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">
    Update
  </button>
  <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md">
    Cancel
  </button>
</Modal>

    </div>
  );
};

export default Dashboard;
