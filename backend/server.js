// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const userRouter = require("./routes/user");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + '/.env' });

const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/user", userRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log("❌ DB Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
