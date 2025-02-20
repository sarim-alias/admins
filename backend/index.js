// Imports.
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import cors from "cors";

// App. 
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;


// Middleware.
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));

// Routes.
app.get("/", (req, res) => {
    res.send("Hello, Express is running! 🚀⭐");
});


// Routing.
app.use("/api/auth", authRoutes);
  
// Server.
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running at http://localhost:${PORT} 🚀⭐`);
});
