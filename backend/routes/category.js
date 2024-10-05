const express = require("express");
const {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory
} = require("../controller/category");

const categoryRouter = new express.Router();

categoryRouter.post("/create-category", createCategory);
categoryRouter.get("/getCategory", getCategory);
categoryRouter.put("/updateCategory/:id", updateCategory);
categoryRouter.delete('/deleteCategory/:id',deleteCategory);
module.exports = {
  categoryRouter,
};
