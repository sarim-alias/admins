import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  }}, { timestamps: true });

const Game = mongoose.model("Game", gameSchema);

export default Game;