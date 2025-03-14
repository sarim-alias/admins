// Imports.
import express from "express";
import { gameCreate, getAllGames, getGameById, deleteGameById, updateGameById } from "../controller/game.controller.js";
import upload from "../uploads/multerConfig.js";

const router = express.Router();

// Game.
router.post("/game/create", upload.single("image"), gameCreate);
router.get("/", getAllGames);
router.get("/:id", getGameById);
router.delete("/:id", deleteGameById);
router.put("/:id", upload.single("image"), updateGameById);

export default router;