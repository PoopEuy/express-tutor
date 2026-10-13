//layer untuk handle request dan response dari client
//untuk validasi body request

const express = require("express");
const { prisma } = require("../db/index.js");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(productId) },
  });

  if (!product) {
    return res.status(400).send("Product not found");
  }

  res.send(product);
});

router.post("/", async (req, res) => {
  const newProductData = req.body;
  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      price: newProductData.price,
      description: newProductData.description,
      image: newProductData.image,
    },
  });
  res.status(201).send({
    data: product,
    message: "Product created successfully",
  });
});

router.delete("/:id", async (req, res) => {
  const productId = req.params.id;

  await prisma.product.delete({ where: { id: parseInt(productId) } });
  res.send({ message: "Product deleted successfully" });
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const updatedProductData = req.body;

  if (
    !(
      updatedProductData.name &&
      updatedProductData.price &&
      updatedProductData.description &&
      updatedProductData.image
    )
  ) {
    return res.status(400).send({ message: "All fields are required" });
  }
  const updatedProduct = await prisma.product.update({
    where: { id: parseInt(productId) },
    data: {
      name: updatedProductData.name,
      price: updatedProductData.price,
      description: updatedProductData.description,
      image: updatedProductData.image,
    },
  });

  res.send({
    data: updatedProduct,
    message: "Product updated successfully",
  });
});

//patch boleh merubah sebagian data, sedangkan put harus merubah semua data
router.patch("/:id", async (req, res) => {
  const productId = req.params.id;
  const updatedProductData = req.body;

  const updatedProduct = await prisma.product.update({
    where: { id: parseInt(productId) },
    data: {
      name: updatedProductData.name,
      price: updatedProductData.price,
      description: updatedProductData.description,
      image: updatedProductData.image,
    },
  });

  res.send({
    data: updatedProduct,
    message: "Product updated successfully",
  });
});

module.exports = router;
