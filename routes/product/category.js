const express = require('express');
const routes = express.Router();
const { getCategory, getCategoryProduct } = require('../../controllers/product/categoryController');
const { login } = require('../../middlewares/auth');

routes.get('/all-category', getCategory);
routes.get('/category-product/:id', getCategoryProduct);

module.exports = routes;
