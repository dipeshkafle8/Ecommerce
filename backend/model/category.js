const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: String,
  slug: String,
});

const categoryModel = mongoose.model("Category", categorySchema);


module.exports = {
    categoryModel
}