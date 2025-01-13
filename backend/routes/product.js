const express = require("express");
const {
  getProducts,
  addProducts,
  getParticularProducts,
  deleteParticularProduct,
  getFamousProduct,
  getSimilarProducts,
  searchProducts,
} = require("../controller/product");
const { isAdmin } = require("../middelware/verifyJWT"); //use in addProduct
const productRouter = new express.Router();

productRouter.get("/getProducts", getProducts);
productRouter.get("/get-famousProducts", getFamousProduct);
productRouter.post("/addProduct", addProducts);
productRouter.get("/getParticularProduct/:slug", getParticularProducts);
productRouter.delete("/deleteProduct/:id", isAdmin, deleteParticularProduct);
productRouter.get("/getSimilarProducts", getSimilarProducts);
productRouter.get("/search", searchProducts);
module.exports = {
  productRouter,
};
