// Imports.
import Game from "../models/game.model.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";
const validCategories = ["Featured", "New", "Driving", "Casual", "2 Player"];

// gameCreate.
export const gameCreate = async (req, res) => {
  try {
    const { title, description, iframeUrl, category } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const validCategories = ["Featured", "New", "Driving", "Casual", "2 Player"];

    // Ensure category is an array
    const categories = Array.isArray(category) ? category : [category];

    const invalidCategories = categories.filter(cat => !validCategories.includes(cat));
    if (invalidCategories.length > 0) {
      return res.status(400).json({ error: `Invalid category selected: ${invalidCategories.join(", ")}` });
    }

    const existingGame = await Game.findOne({ title });
    if (existingGame) {
      return res.status(400).json({ error: "Game title already exists" });
    }

    const newGame = new Game({
      title,
      description,
      iframeUrl,
      imageUrl: req.file.path,
      category: categories,
    });

    await newGame.save();

    res.status(201).json({
      message: "Game created successfully!",
      _id: newGame._id,
      title: newGame.title,
      description: newGame.description,
      iframeUrl: newGame.iframeUrl,
      imageUrl: newGame.imageUrl,
      category: newGame.category,
      likes: newGame.likes,
      dislikes: newGame.dislikes,
    });

  } catch (error) {
    console.error("Error in gameCreate controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// getAllGames.
export const getAllGames = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};

        const games = await Game.find(filter);
        res.sendSuccess(games);
    } catch (error) {
        console.error("Error fetching games:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// getGameById.
export const getGameById = async (req, res) => {
    try {
        const { id } = req.params;
        const game = await Game.findById(id);

        if (!game) return res.status(404).json({ error: "Game not found" });

        res.status(200).json(game);
    } catch (error) {
        console.error("Error fetching game by ID:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// deleteGameById.
export const deleteGameById = async (req, res) => {
    try {
        const { id } = req.params;
        const game = await Game.findByIdAndDelete(id);

        if (!game) return res.status(404).json({ error: "Game not found" });

        res.status(200).json({ message: "Game deleted successfully!" });
    } catch (error) {
        console.error("Error deleting game:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// updateGameById.
export const updateGameById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, iframeUrl, category } = req.body;
    const imageUrl = req.file ? req.file.path : undefined;

    const validCategories = ["Featured", "New", "Driving", "Casual", "2 Player"];

    let categories;
    if (category) {
      categories = Array.isArray(category) ? category : [category];
      const invalidCategories = categories.filter(cat => !validCategories.includes(cat));
      if (invalidCategories.length > 0) {
        return res.status(400).json({ error: `Invalid category selected: ${invalidCategories.join(", ")}` });
      }
    }

    const updateData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(iframeUrl && { iframeUrl }),
      ...(imageUrl && { imageUrl }),
      ...(categories && { category: categories }),
    };

    const updatedGame = await Game.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedGame) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.status(200).json({
      message: "Game updated successfully!",
      updatedGame,
    });

  } catch (error) {
    console.error("Error updating game:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// getGameByTitle.
export const getGameByTitle = async (req, res) => {
  try {
      const { title } = req.params;

      if (!Game) {
          console.error("Game model is not defined");
          return res.status(500).json({ error: "Game model error" });
      }

      const foundGames = await Game.find({ title: { $regex: title, $options: "i" } });

      if (!foundGames || foundGames.length === 0) {
          return res.status(404).json({ error: "No matching games found" });
      }

      res.status(200).json(foundGames);
  } catch (error) {
      console.error("Error fetching game by title:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

// getGamesByCategory.
export const getGamesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
  
        if (!Game) {
            console.error("Game model is not defined");
            return res.status(500).json({ error: "Game model error" });
        }
  
        const games = await Game.find({ category: { $regex: category, $options: "i" } });
  
        if (!games || games.length === 0) {
            return res.status(404).json({ error: "No games found in this category" });
        }
  
        res.status(200).json(games);
    } catch (error) {
        console.error("Error fetching games by category:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// likeGame.
export const likeGame = async (req, res) => {
    try {
      const { id } = req.params;
  

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid Game ID" });
      }
  
      const game = await Game.findById(id);
      if (!game) {
        return res.status(404).json({ error: "Game not found" });
      }
  
      game.likes += 1;
      await game.save();
  
      res.status(200).json({
        message: "Game liked successfully!",
        likes: game.likes,
        dislikes: game.dislikes,
      });
    } catch (error) {
      console.error("Error liking game:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};
  
// dislikeGame.
export const dislikeGame = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid Game ID" });
      }
  
      const game = await Game.findById(id);
      if (!game) {
        return res.status(404).json({ error: "Game not found" });
      }
  
      game.dislikes += 1;
      await game.save();
  
      res.status(200).json({
        message: "Game disliked successfully!",
        likes: game.likes,
        dislikes: game.dislikes,
      });
    } catch (error) {
      console.error("Error disliking game:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};



export const getGameHistory = async (req, res) => {
    try {
      const userId = req.user.id; 
      if (!userId) {
        return res.status(400).json({ error: "User ID is missing from request" });
      }
      const user = await User.findById(userId).select("-password").populate('gameHistory');
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.sendSuccess(user.gameHistory);
    } catch (error) {
      console.error("Error fetching user:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

export const addGameToHistory = async (req, res) => {
    try {
      const userId = req.user.id; 
      const { gameId } = req.body; 
  
      if (!gameId) {
        return res.status(400).json({ error: "Game ID is required" });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const gameIndex = user.gameHistory.indexOf(gameId);
  
      if (gameIndex !== -1) {
        user.gameHistory.splice(gameIndex, 1);
      }
      user.gameHistory.unshift(gameId);
      await user.save();
      res.sendSuccess({ message: "Game added to history", gameHistory: user.gameHistory });
    } catch (error) {
      console.error("Error adding game to history:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

  export const toggleLikeGame = async (req, res) => {
    try {
      const userId = req.user.id;
      const { gameId } = req.body;
  
      if (!gameId) {
        return res.status(400).json({ error: "Game ID is required" });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const gameIndex = user.likedGames.indexOf(gameId);
  
      if (gameIndex !== -1) {
        user.likedGames.splice(gameIndex, 1);
      } else {
        user.likedGames.push(gameId);
      }
  
      await user.save();
      res.sendSuccess({ message:gameIndex !== -1 ? "Game Disliked Successfully" : "Game Liked Successfully", likedGames: user.likedGames });
    } catch (error) {
      console.error("Error toggling game like:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

  export const getLikedGames = async (req, res) => {
    try {
      const userId = req.user.id;
  
      if (!userId) {
        return res.status(400).json({ error: "User ID is missing from request" });
      }
  
      const user = await User.findById(userId)
        .select("-password")
        .populate('likedGames');
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.sendSuccess(user.likedGames);
    } catch (error) {
      console.error("Error fetching liked games:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  