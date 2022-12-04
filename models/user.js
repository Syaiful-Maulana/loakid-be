"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Wishlist, {foreignKey: 'user_id', as: 'pemilik'})
      User.hasMany(models.Notification, {
        foreignKey: "seller_id",
        as: "seller",
      });
      User.hasMany(models.Notification, {
        foreignKey: "buyer_id",
        as: "buyer",
      });
      User.hasMany(models.Product, { foreignKey: "seller_id", as: "owner" });
      User.hasMany(models.Negotiation, {
        foreignKey: "seller_id",
        as: "ditawar",
      });
      User.hasMany(models.Negotiation, {
        foreignKey: "buyer_id",
        as: "menawar",
      });
      User.hasMany(models.Transaction, {
        foreignKey: "seller_id",
        as: "seller_transaction",
      });
      User.hasMany(models.Transaction, {
        foreignKey: "buyer_id",
        as: "buyer_transaction",
      });
    }
  }
  User.init(
    {
      nama: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      kota: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      no_hp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
