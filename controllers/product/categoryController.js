const { Product, ImageProduct, Category } = require("../../models");
const validator = require("fastest-validator");
const v = new validator();

module.exports = {
  getCategoryProduct: async (req, res) => {
    try {
      const category_id = req.params.id;
      let categories = await Category.findAll({
        where: {
          id: category_id,
        },
        include: ["product"],
      });

      return res.respondGet(categories);
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  getCategory: async (req, res) => {
    try {
      let categories = await Category.findAll({
        include: {
          model: Product,
          as: "product",
          include: [
            {
              model: Category,
              as: "category",
              attributes: ["nama"],
            },
            {
              model: ImageProduct,
              as: "product_image",
              attributes: ["url"],
            },
          ],
        },
      });

      return res.respondGet(categories);
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
};
