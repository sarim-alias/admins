import express from "express";
import { signup, login, logout, getUserById, getMe } from "../controller/auth.controller.js";
import { adminSignup, adminLogin, adminLogout } from "../controller/admin.auth.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Admin
router.post("/admin/signup", adminSignup);
router.post("/admin/login", adminLogin);
router.post("/admin/logout", adminLogout);

// User
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user/:id", getUserById);
router.get("/me",authMiddleware, getMe);

export default router;