require("dotenv").config();
const express = require("express");
const cors = require("cors");

app.use(
  cors({
    origin: "https://your-vercel-site.vercel.app", // 🔁 Replace with your actual Vercel frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();

// CORS: Allow frontend from Vercel
app.use(
  cors({
    origin: "https://your-frontend.vercel.app", // ✅ change to your actual frontend URL
    credentials: true,
  })
);

app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
