const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

//Routes
app.use("/users", require("./routes/users"));
app.use("/projects", require("./routes/projects"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
