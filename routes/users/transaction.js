const express = require("express");
const routes = express.Router();
const {
  listTransactions,
} = require("../../controllers/users/buyer/transactionController");
const { login } = require("../../middlewares/auth");

routes.get("/my-transaction", login, listTransactions);

module.exports = routes;
