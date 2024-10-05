const { z } = require("zod");
const validator = require("validator");

const userLoginSchema = z.object({
  email: z.string().email({ message: "Inavlid email address" }),
  password: z
    .string()
    .min(8, { message: "password must be 8 character long" })
    .max(10, { message: "password cannot exceed 10 character" }),
});

const userRegisterSchema = z.object({
  fullname: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "password must be 8 character long" })
    .max(10, { message: "password cannot exceed 10 character" }),
  phone_number: z.string().refine(validator.isMobilePhone,{message:"phone number must be valid"}),
});

module.exports = {
  userLoginSchema,
  userRegisterSchema,
};
