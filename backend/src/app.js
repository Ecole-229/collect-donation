const express = require("express");
const cors = require("cors");
const user = require("./routes/user.routes.js");
const project = require("./routes/project.routes.js");
const donation = require("./routes/don.routes.js");
const cart = require("./routes/panier.routes.js");

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
app.use("/api/cart", cart);

module.exports = app;