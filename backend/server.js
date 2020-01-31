const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

//Get environments from .env file
if (process.env.NODE_ENV !== "production") dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.send("It is Working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
