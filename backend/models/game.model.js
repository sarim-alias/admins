import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  iframeUrl: {
    type: String,
    default: "",
  },
  categories: {
    type: [String],
    default: [],
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  videoUrl: {
    type: String,
    default: "",
  },
  shareUrl: {
    type: String,
    default: "",
  },
  // createdAt, updatedAt
}, { timestamps: true });

const Game = mongoose.model("Game", gameSchema);

export default Game;