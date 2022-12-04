const { Notification, User, Negotiation, Product, ImageProduct } = require('../../models');
const { Op } = require('sequelize');

module.exports = {
  getNotif: async (req, res) => {
    try {
      const user = req.user;

      const getNotifBuyer = await Notification.findAll({
        where: {
          buyer_id: user.id,
        },
        include: [
          {
            model: User,
            as: 'seller',
            attributes: ['nama'],
          },
          {
            model: Product,
            as: 'product_notif',
            include: [
              {
                model: ImageProduct,
                as: 'product_image',
                attributes: ['url'],
              },
            ],
          },
          {
            model: Negotiation,
            as: 'data_nego',
            where: { is_reject: false },
          },
        ],
      });

      const getNotifSeller = await Notification.findAll({
        where: {
          seller_id: user.id,
        },
        include: [
          {
            model: User,
            as: 'buyer',
            attributes: ['nama'],
          },
          {
            model: Product,
            as: 'product_notif',
            include: [
              {
                model: ImageProduct,
                as: 'product_image',
                attributes: ['url'],
              },
            ],
          },
          {
            model: Negotiation,
            as: 'data_nego',
          },
        ],
      });

      return res.respondGet({ notif_buyer: getNotifBuyer, notif_seller: getNotifSeller }, 'success get my notif');
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  getDetailNotif: async (req, res) => {
    try {
      const user = req.user;
      const notif_id = req.params.id;

      let query = {
        where: {
          id: notif_id,
        },
      };
      const notif = await Notification.findOne({
        where: {
          id: notif_id,
          seller_id: user.id,
        },
        include: [
          {
            model: User,
            as: 'buyer',
            attributes: ['nama', 'email', 'kota', 'alamat', 'no_hp', 'avatar'],
          },
          {
            model: Product,
            as: 'product_notif',
            include: [
              {
                model: ImageProduct,
                as: 'product_image',
                attributes: ['url'],
              },
            ],
          },
          {
            model: Negotiation,
            as: 'data_nego',
          },
        ],
      });

      if (!notif) return res.respondBadRequest('cant find notif with id ' + notif_id);

      await Notification.update(
        {
          is_read: true,
        },
        query
      );

      return res.respondGet(notif, 'Success Get Detail Data');
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  updateAllNotif: async (req, res) => {
    try {
      const user = req.user;
      let query = {
        where: {
          [Op.or]: {
            seller_id: user.id,
            buyer_id: user.id,
          },
          is_read: false,
        },
      };

      let update = await Notification.update({ is_read: true }, query);

      return res.respondUpdated(update, 'Notif Sudah terbaca');
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
};
