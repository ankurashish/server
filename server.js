require("dotenv").config();

const express = require("express");



const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();

// ✅ CORS should come before routes
app.use(
  cors({
    origin: "https://weeks-of-life-zsls-lqx9jf14f-ankurashishs-projects.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);

// MongoDB + server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
