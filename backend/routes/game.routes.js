import express from "express";


const router = express.Router();

// Game
router.post("/game/create", gameCreate);

export default router;