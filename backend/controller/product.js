const { ProductModel } = require("../model/product");
const { categoryModel } = require("../model/category");
const getProducts = async (req, res) => {
  try {
    //if came through category
    const { filterData, searchQuery, page } = req.query;
    let limitProducts = page * 5;
    let query = {};

    //Apply category filter
    if (filterData && filterData.categories) {
      query.category = { $in: filterData.categories };
    }
    //Apply price range filter
    if (filterData?.priceRange && filterData?.priceRange.length == 2) {
      query.price = {
        $gte: filterData.priceRange[0],
        $lte: filterData.priceRange[1],
      };
    }

    //Apply search query filter
    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: "i" };
    }

    const products = await ProductModel.find(query).limit(limitProducts);

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
    //from frontend we are getting category_name that's why first finding category
    const isCategory = await categoryModel.findOne({ name: category });
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
    console.log(error);
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

//to get famous product which has higher order count
const getFamousProduct = async (req, res) => {
  try {
    const famousProducts = await ProductModel.find({})
      .sort({ orderCount: -1 }) //to get orders in descending order
      .limit(10); //to limit for top 10 products

    res.status(200).json({
      products: famousProducts,
      status: 1,
      msg: "Successfully fetched",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: 0, msg: "Failed to fetch famous products" });
  }
};

const getSimilarProducts = async (req, res) => {
  //productId of current product
  const { category, productId } = req.query;
  try {
    const products = await ProductModel.find({
      category: category,
      _id: { $ne: productId },
    }).limit(5);

    if (products) {
      res
        .status(200)
        .json({ status: 1, msg: "Products found", products: products });
    } else {
      res.status(404).json({ status: 0, msg: "Products not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ status: 0, msg: "Error in getting similar Products" });
  }
};

//while searching in search bar to give recommendation
const searchProducts = async (req, res) => {
  const { query } = req.query;
  try {
    const products = await ProductModel.find({
      name: { $regex: query, $options: "i" },
    }).limit(6);

    if (products.length > 0) {
      res
        .status(200)
        .json({ status: 1, msg: "Suggestions fetched", suggestions: products });
    } else {
      res.status(404).json({ status: 0, msg: "Product suggestion not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ status: 0, msg: "Error in getting products suggestions" });
  }
};
module.exports = {
  addProducts,
  getParticularProducts,
  getProducts,
  deleteParticularProduct,
  getFamousProduct,
  getSimilarProducts,
  searchProducts,
};
