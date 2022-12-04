const express = require("express");
const routes = express.Router();
const {
  getNotif,
  getDetailNotif,
  updateAllNotif,
} = require("../../controllers/product/notifikasiController");
const { login } = require("../../middlewares/auth");

routes.get("/get-notif", login, getNotif);
routes.get("/get-detail-notif/:id", login, getDetailNotif);
routes.put("/update-all-notif", login, updateAllNotif);

module.exports = routes;
