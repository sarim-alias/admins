// Imports.
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"

// App. 
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Middleware.
app.use(express.json());
app.use(cookieParser());

// Routes.
app.get("/", (req, res) => {
    res.send("Hello, Express is running! 🚀⭐");
});


// Routing.
app.use("/api/auth", authRoutes);
  
// Server.
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT} 🚀⭐`);
});
