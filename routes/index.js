const express = require('express');
const routes = express.Router();
const auth = require('./users/auth');
const profile = require('./users/profile');
const product = require('./product');
const nego = require('./product/nego');
const wishlist = require('./product/wishlist');
const notification = require('./notifikasi');
const buyer = require('./users/transaction');
const images = require('./product/image');
const category = require('./product/category');
// welcome
routes.get('/', (req, res) => {
  res.respondGet(null, 'welcome to Old But New!');
});
routes.get('/dokumentasi', (req, res) => {
  res.redirect('https://documenter.getpostman.com/view/15168385/UzBnpRWR');
});

// login
routes.use('/auth', auth); // 2 endpoint fix | total 5 endpoint
routes.use('/profile', profile); // total 2 endpoint
routes.use('/product', product); // total 9 endpoint
routes.use('/nego', nego); // total 4 endpoint
routes.use('/wishlist', wishlist); // total 3 endpoint
routes.use('/notification', notification); // total 3 endpoint
routes.use('/history', buyer); // total 1 endpoint
routes.use('/images', images); // total 4 endpoint
routes.use('/category', category); // total 2 endpoint
module.exports = routes;
