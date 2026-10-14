const express = require("express");
const { prisma } = require("../db/index.js");
const router = express.Router();

router.get("/", async (req, res) => {
  const { purchase, badge, isBirthday } = req.query;
  let discountMember = 0;

  if (purchase < 0) {
    return res.status(400).send("Purchase amount cannot be negative");
  }

  if (badge === "GOLD") {
    if (purchase >= 1000000) {
      discountMember = 0.15 * purchase;
    } else if (purchase < 1000000) {
      discountMember = 0.1 * purchase;
    }
  } else if (badge === "SILVER") {
    if (purchase >= 1000000) {
      discountMember = 0.1 * purchase;
    } else if (purchase < 1000000) {
      discountMember = 0.05 * purchase;
    }
  } else if (badge === "REGULAR") {
    discountMember = 0 * purchase;
  }

  let extraDiscount = 0;
  if (isBirthday === "true") {
    console.log("ultah");
    extraDiscount = 0.05 * purchase;
  }

  let maxDiscount = 0.2 * purchase;
  const totalDiscount = discountMember + extraDiscount;

  let finalDiscount = 0;
  let TotalDiscountPercentage = 0;

  if (totalDiscount > maxDiscount) {
    finalDiscount = maxDiscount;
  } else {
    finalDiscount = totalDiscount;
    TotalDiscountPercentage = (maxDiscount / purchase) * 100;
  }
  const FinalPrice = purchase - finalDiscount;

  console.log("TotalDiscountPercentage", TotalDiscountPercentage);

  const discountData = {
    Membership: badge,
    TotalPurchase: purchase,
    Birthday: isBirthday,
    BaseDiscount: discountMember,
    BirthdayBonus: extraDiscount,
    TotalDiscount: TotalDiscountPercentage,
    FinalPrice: FinalPrice,
  };

  res.send(discountData);
});

module.exports = router;
