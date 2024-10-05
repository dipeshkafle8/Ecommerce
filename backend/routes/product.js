const express = require("express");
const {
  getProducts,
  addProducts,
  getParticularProducts,
  deleteParticularProduct,
  applyPagination,
} = require("../controller/product");
const { isAdmin } = require("../middelware/verifyJWT");
const productRouter = new express.Router();

productRouter.get("/getProducts", getProducts);
productRouter.post("/addProduct", isAdmin, addProducts);
productRouter.get("/getParticularProduct/:slug", getParticularProducts);
productRouter.delete("/deleteProduct/:id", isAdmin, deleteParticularProduct);
productRouter.get('/getProduct/pageCount/:pageNo',applyPagination)
module.exports = {
  productRouter,
};
