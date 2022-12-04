const { Product, ImageProduct, Notification, Category, User, Wishlist } = require('../../models');
const validator = require('fastest-validator');
const v = new validator();
const { imagekit } = require('../../helpers/imagekit');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

module.exports = {
  add: async (req, res) => {
    try {
      const user = req.user;
      // upload product maks 4
      const productSold = await Product.findAll({
        where: { seller_id: user.id, is_sold: false },
      });

      if (productSold.length == 4) return res.respondBadRequest('produkmu sudah 4');

      const schema = {
        nama: 'string|required',
        deskripsi: 'string|required',
        harga: 'string|required',
        category_id: 'string|required',
      };

      const validate = v.validate(req.body, schema);
      if (validate.length) return res.respondBadRequest(validate);

      // create product
      const newProduct = await Product.create({
        ...req.body,
        seller_id: user.id,
      });

      // upload image
      const data = req.files;

      data.forEach(async (element) => {
        const file = element.buffer.toString('base64');
        const namaFile = Date.now() + '-' + element.originalname;

        const upload = await imagekit.upload({
          file: file,
          fileName: namaFile,
        });
        await ImageProduct.create({
          url: upload.url,
          product_id: newProduct.id,
        });
        return;
      });

      // create notif
      await Notification.create({
        seller_id: user.id,
        product_id: newProduct.id,
        description: 'Produk berhasil diterbitkan',
      });

      return res.respondCreated(newProduct, 'Success Add New Product');
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  getAllProduct: async (req, res) => {
    try {
      const { page, size } = req.query;
      let products = await Product.findAndCountAll({
        where: { is_sold: false },
        limit: size,
        offset: (page - 1) * size,
        include: [
          {
            model: User,
            as: 'owner',
            attributes: ['nama', 'avatar'],
          },
          {
            model: Category,
            as: 'category',
            attributes: ['nama'],
          },
          {
            model: ImageProduct,
            as: 'product_image',
            attributes: ['url'],
          },
        ],
      });

      let nextPage = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}?page=${page >= Math.ceil(products.count / size) ? Number(page) + 1 - page : Number(page) + 1}&size=${size}`;

      let previousPage = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}?page=${page == 1 ? Math.ceil(products.count / size) : page <= Math.ceil(products.count / size) ? Number(page) - 1 : 3}&size=${size}`;

      let data = products.rows.length === 0 ? 'data habis, silahkan kembali ke halaman awal' : products.rows;

      let result = {
        count: products.count,
        data: products.rows,
        pageTotal: Math.ceil(products.count / size),
        currentPage: page,
        nextPage: nextPage,
        previousPage: previousPage,
      };

      return res.respondGet(result);
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  getMyProduct: async (req, res) => {
    try {
      const user = req.user;

      const findMyProduct = await Product.findAll({
        where: { seller_id: user.id },
        include: [
          {
            model: User,
            as: 'owner',
            attributes: ['nama', 'avatar'],
          },
          {
            model: Category,
            as: 'category',
            attributes: ['nama'],
          },
          {
            model: ImageProduct,
            as: 'product_image',
            attributes: ['url'],
          },
        ],
      });

      return res.respondGet(findMyProduct, 'success get my product');
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  getDetailProduct: async (req, res) => {
    try {
      const product_id = req.params.id;
      const token = req.headers['authorization'];

      const secretKey = process.env.JWT_SECRET_KEY;
      let product;

      if (token) {
        const decoded = jwt.verify(token, secretKey);

        req.user = decoded;
        const user = req.user;

        product = await Product.findOne({
          where: {
            id: product_id,
          },
          include: [
            {
              model: User,
              as: 'owner',
              attributes: ['nama', 'avatar'],
            },
            {
              model: Category,
              as: 'category',
              attributes: ['nama'],
            },
            {
              model: ImageProduct,
              as: 'product_image',
              attributes: ['url'],
            },
            {
              model: Wishlist,
              as: 'user_wishlist',
              where: { user_id: user.id },
              required: false,
              attributes: ['id', 'user_id', 'product_id'],
              include: [
                {
                  model: User,
                  as: 'pengagum',
                  attributes: ['nama', 'avatar'],
                },
              ],
            },
          ],
        });
      } else {
        product = await Product.findOne({
          where: {
            id: product_id,
          },
          include: [
            {
              model: User,
              as: 'owner',
              attributes: ['nama', 'avatar'],
            },
            {
              model: Category,
              as: 'category',
              attributes: ['nama'],
            },
            {
              model: ImageProduct,
              as: 'product_image',
              attributes: ['url'],
            },
          ],
        });
      }

      if (!product) return res.respondBadRequest('cant find product with id ' + product_id);

      return res.respondGet(product, 'succesfully get detail data');
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const product_id = req.params.id;
      const { nama, deskripsi, harga, category_id } = req.body;

      let query = {
        where: {
          id: product_id,
        },
      };

      const isExist = await Product.findOne({ query });
      if (!isExist) return res.respondNotFound(null, `not found data with product_id =  ${product_id}`);

      const schema = {
        nama: 'string|required',
        deskripsi: 'string|required',
        harga: 'number|required',
        category_id: 'number|required',
      };

      const validate = v.validate(req.body, schema);
      if (validate.length) return res.respondBadRequest(validate);
      let updated = await Product.update(
        {
          nama,
          deskripsi,
          harga,
          category_id,
        },
        query
      );
      return res.respondUpdated(updated);
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product_id = req.params.id;

      const check = await Product.findOne({ where: { id: product_id } });
      if (!check) return res.respondNotFound(null, `not found data with product_id =  ${product_id}`);

      let deleted = await Product.destroy({
        where: {
          id: product_id,
        },
      });
      return res.respondDeleted(deleted);
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  updateSold: async (req, res) => {
    try {
      const product_id = req.params.id;
      const { is_sold } = req.body;

      let query = {
        where: {
          id: product_id,
        },
      };
      const product = await Product.findOne({
        where: {
          id: product_id,
        },
      });

      if (!product) return res.respondBadRequest('cant find product with id ' + product_id);

      let update = await Product.update(
        {
          is_sold,
        },
        query
      );

      return res.respondUpdated(update, 'Product Berhasil Terjual');
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  soldProduct: async (req, res) => {
    try {
      const user = req.user;

      const productSold = await Product.findAll({
        where: { seller_id: user.id, is_sold: true },
        include: [
          {
            model: User,
            as: 'owner',
            attributes: ['nama', 'avatar'],
          },
          {
            model: Category,
            as: 'category',
            attributes: ['nama'],
          },
          {
            model: ImageProduct,
            as: 'product_image',
            attributes: ['url'],
          },
        ],
      });

      return res.respondGet(productSold, 'success get product yang terjual');
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  search: async (req, res) => {
    try {
      const { search } = req.query;
      const dataResult = await Product.findAll({
        include: [
          {
            model: User,
            as: 'owner',
            attributes: ['nama', 'avatar'],
          },
          {
            model: Category,
            as: 'category',
            attributes: ['nama'],
          },
          {
            model: ImageProduct,
            as: 'product_image',
            attributes: ['url'],
          },
        ],
        where: {
          [Op.or]: {
            nama: {
              [Op.iLike]: `%${search}%`,
            },
            deskripsi: {
              [Op.iLike]: `%${search}%`,
            },
          },
        },
      });
      return res.respondGet(dataResult);
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
};
