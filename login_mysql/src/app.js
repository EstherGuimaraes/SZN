const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 API funcionando!");
});

app.use("/usuarios", userRoutes);

module.exports = app;
