const express = require("express");
const colors = require("colors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// configure dotenv
dotenv.config();
// {
//   path: "backend/config/config.env",
// }

// configure mongoose database
connectDB();

// configure express
const app = express();

// cors
app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes import
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/likes"));
app.use("/api/notes/", require("./routes/notes"));

// static folder

__dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

// start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(colors.yellow.bold(`Server started on port ${PORT}`));
});
