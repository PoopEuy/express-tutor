const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World123123!");
});

const productController = require("./product/product.controller.js");
const authController = require("./auth/auth.controller.js");

app.use("/products", productController);
app.use("/auth", authController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
