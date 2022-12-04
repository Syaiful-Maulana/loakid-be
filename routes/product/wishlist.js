const express = require("express");
const routes = express.Router();
const {
  createWishlist,
  getAllWishlist,
  deleteWishlist,
} = require("../../controllers/product/wishlistController");
const { login } = require("../../middlewares/auth");

routes.post("/add-wishlist", login, createWishlist);
routes.get("/all-wishlist", login, getAllWishlist);
routes.delete("/delete-wishlist/:id", login, deleteWishlist);

module.exports = routes;
