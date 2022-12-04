const express = require("express");
const routes = express.Router();
const upload = require("../../middlewares/upload");
const {
  getMyProfile,
  updateProfile,
} = require("../../controllers/users/profile/profileController");
const { login } = require("../../middlewares/auth");

routes.get("/", login, getMyProfile);
routes.post("/update-profile", login, upload, updateProfile);

module.exports = routes;
