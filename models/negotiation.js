"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Negotiation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Negotiation.belongsTo(models.User, {
        foreignKey: "seller_id",
        as: "ditawar",
      });
      Negotiation.belongsTo(models.User, {
        foreignKey: "buyer_id",
        as: "penawar",
      });
      Negotiation.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product_nego",
      });
      Negotiation.hasOne(models.Notification, {
        foreignKey: "negotiation_id",
        as: "nego",
      });
    }
  }
  Negotiation.init(
    {
      seller_id: DataTypes.INTEGER,
      buyer_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      harga_tawar: DataTypes.INTEGER,
      is_accept: DataTypes.BOOLEAN,
      is_reject: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Negotiation",
    }
  );
  return Negotiation;
};
