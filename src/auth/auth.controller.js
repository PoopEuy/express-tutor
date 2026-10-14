// Handle request dan response untuk auth

const express = require("express");
const router = express.Router();
const { register, login } = require("./auth.service.js");

// POST /auth/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ message: "name, email, dan password wajib diisi" });
  }

  try {
    const user = await register({ name, email, password });
    res.status(201).send({
      data: user,
      message: "Registrasi berhasil",
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// POST /auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "email dan password wajib diisi" });
  }

  try {
    const { user, token } = await login(email, password);
    res.send({
      data: { user, token },
      message: "Login berhasil",
    });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

module.exports = router;
