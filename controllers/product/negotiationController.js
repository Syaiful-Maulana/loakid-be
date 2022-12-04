const { Negotiation, Notification, Transaction, Product, User } = require('../../models');
const validator = require('fastest-validator');
const v = new validator();

module.exports = {
  createNego: async (req, res) => {
    try {
      const user = req.user;

      const schema = {
        harga_tawar: 'number|required',
        product_id: 'number|required',
        seller_id: 'number|required',
      };

      const validate = v.validate(req.body, schema);
      if (validate.length) return res.respondBadRequest(validate);

      const newNego = await Negotiation.create({
        ...req.body,
        buyer_id: user.id,
      });

      await Notification.create({
        seller_id: newNego.seller_id,
        buyer_id: user.id,
        product_id: newNego.product_id,
        negotiation_id: newNego.id,
        description: 'Penawaran produk',
      });

      return res.respondGet(newNego, 'succesfully create Negotiation harga');
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  getAllNego: async (req, res) => {
    try {
      const myNego = req.user;
      const getNegoBuyer = await Negotiation.findAll({
        where: {
          buyer_id: myNego.id,
        },
        include: [
          {
            model: User,
            as: 'penawar',
            attributes: ['nama', 'kota', 'alamat'],
          },
          {
            model: User,
            as: 'ditawar',
            attributes: ['nama', 'kota', 'alamat'],
          },
        ],
      });

      const getNegoSeller = await Negotiation.findAll({
        where: {
          seller_id: myNego.id,
        },
        include: [
          {
            model: User,
            as: 'ditawar',
            attributes: ['nama', 'kota', 'alamat'],
          },
          {
            model: User,
            as: 'penawar',
            attributes: ['nama', 'kota', 'alamat'],
          },
        ],
      });
      return res.respondGet({ data_penawar: getNegoBuyer, data_ditawar: getNegoSeller }, 'success get my nego');
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  getDetailNego: async (req, res) => {
    try {
      const myNego = req.user;
      const negoId = req.params.id;

      let query = {
        where: {
          seller_id: myNego.id,
        },
      };

      const getNegoSeller = await Negotiation.findOne({
        where: {
          id: negoId,
          seller_id: myNego.id,
        },

        include: [
          {
            model: User,
            as: 'penawar',
            attributes: ['nama', 'kota', 'alamat', 'no_hp'],
          },
        ],
      });

      if (!getNegoSeller) return res.respondBadRequest('nothin offering with id ' + negoId);

      const link = `https://wa.me/${getNegoSeller.penawar.no_hp}`;
      await Notification.update({ is_read: true }, query);

      return res.respondGet({ data_nego: getNegoSeller, link }, 'success get my detail nego');
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  updateNego: async (req, res) => {
    try {
      const user = req.user;
      const negoId = req.params.id;
      const { is_accept, is_reject } = req.body;

      const dataExist = await Negotiation.findOne({
        where: { id: negoId, seller_id: user.id },
      });
      if (!dataExist) return res.respondNotFound();

      const updatedNego = await Negotiation.update({ is_accept, is_reject }, { where: { id: negoId, seller_id: user.id } });

      await Notification.update(
        {
          is_read: true,
        },
        { where: { negotiation_id: negoId } }
      );

      if (is_accept) {
        await Transaction.create({
          seller_id: user.id,
          buyer_id: dataExist.buyer_id,
          product_id: dataExist.product_id,
          total_harga: dataExist.harga_tawar,
        });
      }

      return res.respondUpdated(updatedNego, 'Success Update Data');
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
};
