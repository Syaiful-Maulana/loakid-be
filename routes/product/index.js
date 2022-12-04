const express = require('express');
const routes = express.Router();
const { add, getAllProduct, getMyProduct, getDetailProduct, updateProduct, deleteProduct, updateSold, soldProduct, search } = require('../../controllers/product/productController');
const { login } = require('../../middlewares/auth');
const upload = require('../../middlewares/uploadMulti');

routes.post('/add-product', login, upload, add);
routes.get('/all-product', getAllProduct);
routes.get('/my-product', login, getMyProduct);
routes.get('/detail-product/:id', getDetailProduct);
routes.put('/update-product/:id', login, updateProduct);
routes.delete('/delete-product/:id', login, deleteProduct);
routes.put('/update-sold/:id', login, updateSold);
routes.get('/product-sold', login, soldProduct);
routes.post('/search-product', search);

module.exports = routes;
