"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notification.belongsTo(models.User, {
        foreignKey: "seller_id",
        as: "seller",
      });
      Notification.belongsTo(models.User, {
        foreignKey: "buyer_id",
        as: "buyer",
      });
      Notification.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product_notif",
      });
      Notification.belongsTo(models.Negotiation, { 
        foreignKey: "negotiation_id",
        as: "data_nego"
      })
    }
  }
  Notification.init(
    {
      seller_id: DataTypes.INTEGER,
      buyer_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      negotiation_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
      is_read: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
