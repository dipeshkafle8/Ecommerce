const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  isVerified: {
    type:Boolean,
    default:false
  },
  isActive: {
    type:Boolean,
    default:true
  },
  address: [
    {
      street: String,
      city: String,
      state: String,
    },
  ],
  wishList: [],
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type:String,
    default:Date.now()
  },
  updateAt: Date,
});

const userModel = mongoose.model("User", userSchema);
module.exports = {
    userModel
}