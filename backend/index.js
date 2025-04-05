// import express from "express"
// import dotenv from "dotenv"
// import userRoutes from "./routes/user.routes.js"
// import { connectDB } from "./lib/connectDB.js"
// import cors from "cors"

// dotenv.config()

// const PORT = process.env.PORT || 3000

// const app = express()


// app.use(cors({
//     origin: ["http://localhost:5173", "https://parking-mit.vercel.app"], // ✅ No trailing slashes
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // ✅ Allow all standard HTTP methods
//     allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow necessary headers
//     credentials: true // ✅ If you're sending cookies or auth headers
// }));

// app.use(express.json())
// app.all("/", async (req, res) => {
//     res.send("BACKEND IS RUNNING")
// })

// app.use("/api",userRoutes)

// app.listen(PORT, () => {
//     connectDB()
//     console.log(`SERVER STARTED AT PORTED NO ${PORT}`)
// })

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import { connectDB } from "./lib/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS config – adjust domains for dev & prod
app.use(cors({
  origin: ["http://localhost:5173", "https://parking-mit.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Basic root test route
app.all("/", (req, res) => {
  res.send("✅ BACKEND IS RUNNING");
});

// Use API routes
app.use("/api", userRoutes);

// Start server
app.listen(PORT, () => {
  connectDB(); // Connect to MongoDB
  console.log(`🚀 SERVER STARTED AT PORT ${PORT}`);
});
