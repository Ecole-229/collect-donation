const express = require("express");
const cors = require("cors");
const user = require("./routes/user.routes");
const project = require("./routes/project.routes");
const donation = require("./routes/don.routes");

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", user);
app.use("/api/project", project);
app.use("/api/donation", donation);

module.exports = app;