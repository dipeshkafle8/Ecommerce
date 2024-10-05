const { categoryModel } = require("../model/category");
const slugify = require("slugify");

// focus on crud
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);

    const existedCategory = await categoryModel.findOne({ name });

    if (!existedCategory) {
      const newCategory = new categoryModel({
        name,
        slug: slugify(name, {
          lower: true,
        }),
      });
      await newCategory.save();
      console.log(newCategory);

      res.status(201).json({
        message: "category created successfully",
        status: 1,
      });
    } else {
      res.status(402).json({
        message: "Category is already present, check once",
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

const getCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    if (category) {
      res.status(200).json({
        message: "category found ",
        status: 1,
        category,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: 0,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name, {
          lower: true,
        }),
      },
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({
        message: "Category not found",
        status: 0,
      });
    }

    res.status(200).json({
      message: "Category updated successfully",
      status: 1,
      data: updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      status: 0,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await categoryModel.deleteOne({ _id: id });
    console.log(deletedCategory);
    if (deletedCategory.deletedCount > 0) {
      return res.status(201).json({
        message: "Category deleted successfully",
        status: 1,
      });
    }

    res.status(400).json({
      message: "Category not found",
      status: 0,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: 0,
    });
  }
};

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
