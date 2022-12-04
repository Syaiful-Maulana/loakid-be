"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
      Product.hasMany(models.ImageProduct, { foreignKey: 'product_id', as: 'product_image' });
      Product.belongsTo(models.User, { foreignKey: 'seller_id', as: 'owner' });
      Product.hasOne(models.Negotiation, { foreignKey: 'product_id', as: 'product_nego' });
      Product.hasOne(models.Notification, { foreignKey: 'product_id', as: 'product_notif' });
      Product.hasOne(models.Transaction, { foreignKey: 'product_id', as: 'product_transaction' });
      Product.hasMany(models.Wishlist, { foreignKey: 'product_id', as: 'user_wishlist' });
    }
  }
  Product.init(
    {
      seller_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      nama: DataTypes.STRING,
      deskripsi: DataTypes.TEXT,
      harga: DataTypes.INTEGER,
      is_sold: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
