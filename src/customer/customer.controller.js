const express = require("express");
const { prisma } = require("../db/index.js");
const router = express.Router();

router.get("/", async (req, res) => {
  const { status } = req.query;
  const customer = await prisma.customer.findMany({
    where: status
      ? { status: { contains: status, mode: "insensitive" } }
      : undefined,
    orderBy: { ammount: "desc" },
  });

  const invalidTransacstion = customer.filter((c) => c.ammount < 0);
  const JumlahInvalidTransaksi = invalidTransacstion.length;

  console.log("invalid trasaksi", invalidTransacstion);
  console.log("Jumlah invalid transaksi:", JumlahInvalidTransaksi);
  const jumlahSukses = customer.filter((c) => c.status === "SUCCESS").length;

  const jumlahFailed = customer.filter((c) => c.status === "FAILED").length;

  const totalAmmountSukses = customer
    .filter((c) => c.status === "SUCCESS")
    .reduce((total, c) => total + c.ammount, 0);

  const dataCustomer = {
    totalCustomer: customer.length,
    jumlahTransaksiSukses: jumlahSukses,
    jumlahTransaksiFailed: jumlahFailed,
    totalTransaksiSukses: totalAmmountSukses,
    customer,
  };
  res.send(dataCustomer);
});

module.exports = router;
