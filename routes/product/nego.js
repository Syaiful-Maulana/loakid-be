const express = require("express");
const routes = express.Router();
const {
  createNego,
  getDetailNego,
  updateNego,
  getAllNego,
} = require("../../controllers/product/negotiationController");
const { login } = require("../../middlewares/auth");

routes.post("/add-nego", login, createNego);
routes.get("/all-nego", login, getAllNego);
routes.get("/detail-nego/:id", login, getDetailNego);
routes.put("/update-nego/:id", login, updateNego);

module.exports = routes;
