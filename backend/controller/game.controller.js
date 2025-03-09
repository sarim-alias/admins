import Game from "../models/game.model.js";

export const gameCreate = async (req, res) => {
    try {
      const { title, description } = req.body;
  
      const existingGame = await Game.findOne({ title });
      if (existingGame) {
        return res.status(400).json({ error: "Game title already exists" });
      }
  
      const newGame = new Game({
        title,
        description,
      });
  
      await newGame.save();
  
      res.status(201).json({
        _id: newGame._id,
        title: newGame.title,
        description: newGame.description,
      });
  
    } catch (error) {
      console.error("Error in createGame controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  