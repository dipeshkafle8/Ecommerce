// import {z} from 'zod';
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
const {
  userLoginSchema,
  userRegisterSchema,
} = require("../utils/zodValidation");

const { userModel } = require("../model/UserModel");
const handelUserLogin = async (req, res) => {
  try {
    const validateUserData = userLoginSchema.parse(req.body);
    const { email, password } = validateUserData;
    console.log(email, password);

    const isExistingUser = await userModel.findOne({ email });
    if (!isExistingUser) {
      return res.status(400).json({
        message: "User dont exist with us , please register yourself",
        status: 0,
      });
    }
    const encryptedPassword = await bcrypt.compare(
      password,
      isExistingUser.password
    );
    if (encryptedPassword) {
      const jwtToken = jwt.sign(
        { id: isExistingUser._id },
        process.env.jwtSecret,
        {
          expiresIn: 300,
        }
      );

      res.status(201).json({
        message: "User login successfully",
        name: isExistingUser.fullname,
        email: email,
        role: isExistingUser.role,
        token: jwtToken,
        status: 1,
      });
    } else {
      res.status(400).json({
        message: "check your password",
        status: 0,
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { errors } = error;
      return res.status(400).json({ errors: errors[0].message });
    }
    console.log(error);

    res.status(500).json({
      message: "Error in server while login",
      status: 0,
      err: error,
    });
  }
};

const handelUserRegister = async (req, res) => {
  try {
    const validateUserRegister = userRegisterSchema.parse(req.body);
    const { fullname, email, password, phone_number } = validateUserRegister;

    const prevUser = await userModel.findOne({ email });
    if (!prevUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        fullname,
        email,
        password: hashedPassword,
        phone_number,
      };

      const savedUser = new userModel(newUser);
      await savedUser.save();
      res.json({
        message: "User registered successfully",
        status: 1,
      });
    } else {
      res.status(409).json({
        message: "User already existed",
        status: 0,
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { errors } = error;
      return res.status(400).json({ errors: errors[0].message, status: 0 });
    }
    res.status(500).json({
      message: "Internal Server Error",
      Status: 0,
      error,
    });
  }
};

module.exports = {
  handelUserLogin,
  handelUserRegister,
};
