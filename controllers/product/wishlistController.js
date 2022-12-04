const { Wishlist, Product, User, ImageProduct } = require('../../models');
const validator = require('fastest-validator');
const v = new validator();
module.exports = {
  createWishlist: async (req, res) => {
    try {
      const user = req.user;

      const schema = {
        product_id: 'number|required',
      };

      const validate = v.validate(req.body, schema);
      if (validate.length) return res.respondBadRequest(validate);

      const isWishlisted = await Wishlist.findOne({
        where: {
          user_id: user.id,
          product_id: req.body.product_id,
        },
      });

      if (isWishlisted) {
        return res.respondAlreadyExist('You have added wishlist to this product!');
      }

      const newWishlist = await Wishlist.create({
        ...req.body,
        user_id: user.id,
      });
      return res.respondGet(newWishlist, 'succesfully add to my wishlist');
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  getAllWishlist: async (req, res) => {
    try {
      const myWishlist = req.user;

      const getAll = await Wishlist.findAll({
        where: { user_id: myWishlist.id },
        include: [
          {
            model: Product,
            as: 'wishlist',
            include: [
              {
                model: User,
                as: 'owner',
                attributes: ['nama', 'email', 'kota', 'avatar'],
              },
              {
                model: ImageProduct,
                as: 'product_image',
                attributes: ['product_id', 'url'],
              },
            ],
            attributes: ['category_id', 'nama', 'deskripsi', 'harga', 'is_sold'],
          },
        ],
      });
      return res.respondGet(getAll, 'success get all my wishlist');
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  deleteWishlist: async (req, res) => {
    try {
      const wishlist_id = req.params.id;

      const check = await Wishlist.findOne({ where: { id: wishlist_id } });
      if (!check) return res.respondNotFound(null, `not found data with wishlist_id =  ${wishlist_id}`);

      let deleted = await Wishlist.destroy({
        where: {
          id: wishlist_id,
        },
      });
      return res.respondDeleted(deleted, `Success delete wishlist with ${wishlist_id}`);
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
};
