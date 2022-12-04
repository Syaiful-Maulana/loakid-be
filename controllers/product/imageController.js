const { ImageProduct } = require("../../models");
const validator = require("fastest-validator");
const v = new validator();
const { imagekit } = require("../../helpers/imagekit");

module.exports = {
  addImages: async (req, res) => {
    try {
      const { product_id } = req.body;

      // upload image
      const data = req.files;

      data.forEach(async (element) => {
        const file = element.buffer.toString("base64");
        const namaFile = Date.now() + "-" + element.originalname;

        const upload = await imagekit.upload({
          file: file,
          fileName: namaFile,
        });
        const createImage = await ImageProduct.create({
          url: upload.url,
          product_id,
        });
        return;
      });
      return res.respondCreated(null, "berhasil add image");
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
  getImages: async (req, res) => {
    try {
      const image_id = req.params.id;

      const image = await ImageProduct.findOne({ where: { id: image_id } });

      return res.respondGet(image);
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
  updateImages: async (req, res) => {
    try {
      const image_id = req.params.id;
      let query = {
        where: {
          id: image_id,
        },
      };
      const image = await ImageProduct.findOne({ where: { id: image_id } });
      if (!image)
        return res.respondNotFound(
          null,
          `not found data with image_id =  ${image_id}`
        );

      const file = req.file.buffer.toString("base64");
      const namaFile = Date.now() + "-" + req.file.originalname;

      const upload = await imagekit.upload({
        file: file,
        fileName: namaFile,
      });

      const updateImage = await ImageProduct.update(
        {
          url: upload.url,
        },
        query
      );
      return res.respondUpdated(updateImage, "berhasil update image");
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
  deleteImages: async (req, res) => {
    try {
      const image_id = req.params.id;

      const image = await ImageProduct.findOne({ where: { id: image_id } });
      if (!image)
        return res.respondNotFound(
          null,
          `not found data with image_id =  ${image_id}`
        );

      let deleted = await ImageProduct.destroy({
        where: {
          id: image_id,
        },
      });
      return res.respondDeleted(deleted, "image berhasil di delete");
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
};
