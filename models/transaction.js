"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        foreignKey: "seller_id",
        as: "seller_transaction",
      });
      Transaction.belongsTo(models.User, {
        foreignKey: "buyer_id",
        as: "buyer_transaction",
      });
      Transaction.belongsTo(models.Product, {
        foreignKey: "buyer_id",
        as: "product_transaction",
      });
    }
  }
  Transaction.init(
    {
      seller_id: DataTypes.INTEGER,
      buyer_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      total_harga: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
