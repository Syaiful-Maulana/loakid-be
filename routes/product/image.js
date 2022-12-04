const express = require('express');
const routes = express.Router();
const { addImages, getImages, updateImages, deleteImages } = require('../../controllers/product/imageController');
const { login } = require('../../middlewares/auth');
const upload = require('../../middlewares/uploadMulti');
const uploadSingle = require('../../middlewares/upload');

routes.post('/add-images', login, upload, addImages);
routes.get('/all-images', login, getImages);
routes.put('/update-images/:id', login, uploadSingle, updateImages);
routes.delete('/delete-images/:id', login, deleteImages);

module.exports = routes;
