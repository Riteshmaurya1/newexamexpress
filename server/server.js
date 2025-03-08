import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoDB.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import subjectRouter from "./routes/subjectRouter.js";

const app = express();
const port = process.env.PORT || 3000;
connectDB();

const allowedOrigins = ["http://localhost:5173"];
// const allowedOrigins = ["https://examexpresso.vercel.app"];

// Enable CORS for all routes
const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // Add headers your client sends
};

// Middlewares
app.use(express.json()); // Middleware for JSON body parsing
app.use(express.urlencoded({ extended: true })); // Middleware for URL-encoded data
app.use(cookieParser());
app.use(cors(corsOptions)); // Apply CORS with options to all routes
app.options("*", cors(corsOptions)); // Handle preflight for all routes

// API Endpoints
app.get("/", (req, res) => {
  res.send("This is home page");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/subjects", subjectRouter);

app.listen(port, () => {
  console.log(`Server is running on PORT:${port} ✔✨`);
});
