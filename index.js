require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const teaRoutes = require("./routes/tea");
const chatRoutes = require("./routes/chat");
const contactRoutes = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/teas", teaRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/contact", contactRoutes);

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tea_shop")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
