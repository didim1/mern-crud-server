import express from "express";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";

const route = express.Router();

route.get("/products", getProducts);
route.get("/product-:id", getProduct);
route.post("/product", addProduct);
route.put("/product-:id", updateProduct);
route.delete("/product-:id", deleteProduct);

export default route;
