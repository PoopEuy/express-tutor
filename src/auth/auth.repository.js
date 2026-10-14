// Berkomunikasi dengan database untuk operasi User

const { prisma } = require("../db/index.js");

const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
};

const insertUser = async (userData) => {
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    },
  });

  return user;
};

module.exports = {
  findUserByEmail,
  insertUser,
};
