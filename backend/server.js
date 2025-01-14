const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { userRouter } = require("./routes/user");
const { categoryRouter } = require("./routes/category");
const { connectDB } = require("./model/dbConnection");
const { productRouter } = require("./routes/product");
const { cartRouter } = require("./routes/cart");
require("dotenv").config();

const port = process.env.PORT;
const app = express();
//app.use(morgan("combined"));p
app.use(express.json());

app.use(cors());

// this is the normal route for checking
app.get("/", (req, res) => {
  res.json({
    message: "Server started and kicking fine",
  });
});

app.use("/user", userRouter);

app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);

app.post("/api/v1/checkIsAdmin");
app.listen(port, (err) => {
  if (err) {
    console.log("Error while starting the server");
  }
  connectDB();
  console.log(`http://localhost:${port}`);
});
