const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: "true",
  },
  slug: {
    type: String,
    unique: true,
  },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // Percentage discount
  discountedPrice: { type: Number }, // Optional, calculated field

  quantity: { type: Number, required: true },
  isInStock: { type: Boolean, default: true },

  images: [{ type: String }], // Array of image URLs
  thumbnail: { type: String }, // Optional thumbnail

  averageRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User model
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

// Middleware to update the updatedAt field before saving
productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/ /g, "-");
  }
  next();
});

// Create and export the product model
const ProductModel = mongoose.model("Product", productSchema);
module.exports = {
  ProductModel,
};
