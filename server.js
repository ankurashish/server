require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();

// ✅ 1. CORS middleware (Only once)
app.use(
  cors({
    origin: "https://weeks-of-life-zsls-lqx9jf14f-ankurashishs-projects.vercel.app", // <-- Replace this with your real deployed frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ 2. Allow preflight requests
app.options("*", cors());

// ✅ 3. JSON parsing
app.use(express.json());

// ✅ 4. Auth Routes
app.use("/api/auth", authRoutes);

// ✅ 5. Mongo + Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
