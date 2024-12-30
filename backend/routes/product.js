const express = require("express");
const {
  getProducts,
  addProducts,
  getParticularProducts,
  deleteParticularProduct,
  applyPagination,
  getFamousProduct,
  applyFilters,
  getSimilarProducts,
} = require("../controller/product");
const { isAdmin } = require("../middelware/verifyJWT"); //use in addProduct
const productRouter = new express.Router();

productRouter.get("/getProducts", getProducts);
productRouter.get("/get-famousProducts", getFamousProduct);
productRouter.post("/addProduct", addProducts);
productRouter.get("/getParticularProduct/:slug", getParticularProducts);
productRouter.delete("/deleteProduct/:id", isAdmin, deleteParticularProduct);
productRouter.get("/getProduct/pageCount/:pageNo", applyPagination);
productRouter.post("/filter", applyFilters);
productRouter.get("/getSimilarProducts", getSimilarProducts);
module.exports = {
  productRouter,
};
