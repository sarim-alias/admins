import express from "express";
import { gameCreate } from "../controller/game.controller.js";

const router = express.Router();

// Game
router.post("/game/create", gameCreate);

export default router;