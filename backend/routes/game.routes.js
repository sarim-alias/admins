// Imports.
import express from "express";
import { gameCreate, getAllGames, getGameById, deleteGameById, updateGameById, getGameByTitle,  likeGame, dislikeGame, getGamesByCategory } from "../controller/game.controller.js";
import upload from "../uploads/multerConfig.js";

const router = express.Router();

// Game.
router.post("/game/create", upload.single("image"), gameCreate);
router.get("/", getAllGames);
router.get("/:id", getGameById);
router.delete("/:id", deleteGameById);
router.put("/:id", upload.single("image"), updateGameById);
router.get("/title/:title", getGameByTitle);
router.patch("/:id/like", likeGame);
router.patch("/:id/dislike", dislikeGame);
router.get("/category/:category", getGamesByCategory);

export default router;