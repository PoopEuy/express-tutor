// Business logic untuk register dan login

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmail, insertUser } = require("./auth.repository.js");

const register = async (userData) => {
  // Cek apakah email sudah terdaftar
  const existingUser = await findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error("Email sudah terdaftar");
  }

  // Hash password sebelum disimpan
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await insertUser({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
  });

  // Jangan kembalikan password ke client
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const login = async (email, password) => {
  // Cek apakah user ada
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Email atau password salah");
  }

  // Cek apakah password cocok
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Email atau password salah");
  }

  // Buat JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};

module.exports = {
  register,
  login,
};
