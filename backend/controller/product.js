const { ProductModel } = require("../model/product");
const { categoryModel } = require("../model/category");
const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});

    if (products) {
      res.status(200).json({
        message: "Products found",
        status: 1,
        products: products,
      });
    } else {
      res.status(405).json({
        message: "Product not found",
        status: 0,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: 0,
    });
  }
};

// based on slug
const getParticularProducts = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await ProductModel.findOne({ slug: slug }).populate(
      "category"
    );
    if (product) {
      res.status(201).json({
        message: "single product fetched",
        status: 1,
        product,
      });
    } else {
      res.status(301).json({
        message: "Product Not Found",
        status: 0,
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
      status: 0,
    });
  }
};

const addProducts = async (req, res) => {
  try {
    const productData = req.body;
    const { category } = req.body;
    const isCategory = await categoryModel.findOne({ name: category });
    console.log(isCategory);
    console.log(productData);

    if (isCategory) {
      const productSave = await new ProductModel({
        ...productData,
        category: isCategory._id,
      }).save();

      if (productSave) {
        res.status(200).json({
          message: "Products added successfully",
          status: 1,
        });
      } else {
        res.status(403).json({
          message: "product save Error",
          status: 0,
        });
      }
    } else {
      return res.status(402).json({
        message: `Category not found of ${category}`,
        status: 0,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: 0,
    });
  }
};

// deleting based on id
const deleteParticularProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await ProductModel.deleteOne({ _id: id });
    console.log(deletedProduct);
    if (deletedProduct.deletedCount > 0) {
      return res.status(201).json({
        message: "product deleted successfully",
        status: 1,
      });
    }

    res.status(400).json({
      message: "Product not found",
      status: 0,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: 0,
    });
  }
};

// lets apply pagination to the product
const applyPagination = async (req, res) => {
  try {
    let { pageNo } = req.params;
    pageNo = parseInt(pageNo);
    const limit = 7;
    const skip = (pageNo - 1) * limit;

    const products = await ProductModel.find({}).skip(skip).limit(limit);
    const productCount = await ProductModel.countDocuments();

    const pageLimit = Math.ceil(productCount / limit);
    res.status(202).json({
      message: "Product found",
      status: 1,
      pageNo,
      pageLimit,
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      message: "Internal server issue",
      status: 0,
    });
  }
};

module.exports = {
  addProducts,
  getParticularProducts,
  getProducts,
  deleteParticularProduct,
  applyPagination,
};
