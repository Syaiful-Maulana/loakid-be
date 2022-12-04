const { Transaction } = require("../../../models");

module.exports = {
  listTransactions: async (req, res) => {
    try {
      const userId = req.user.id;
      const buyerTransactions = await Transaction.findAll({
        where: { buyer_id: userId },
      });

      const sellerTransactions = await Transaction.findAll({
        where: { seller_id: userId },
      });

      return res.respondGet(
        {
          data_beli_sukses: buyerTransactions,
          data_jual_sukses: sellerTransactions,
        },
        "succesfully get all data"
      );
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
};
