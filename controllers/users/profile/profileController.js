const { User } = require("../../../models");
const { imagekit } = require("../../../helpers/imagekit");
const validator = require("fastest-validator");
const v = new validator();

module.exports = {
  updateProfile: async (req, res) => {
    try {
      const userId = req.user.id;

      let query = {
        where: {
          id: userId,
        },
      };

      const { no_hp, kota, alamat } = req.body;

      const schema = {
        no_hp: "string|required|max:12",
        kota: "string|required",
        alamat: "string|required",
      };

      const validate = v.validate(req.body, schema);
      if (validate.length) return res.respondBadRequest(validate);

      const file = req.file.buffer.toString("base64");
      const namaFile = Date.now() + "-" + req.file.originalname;

      const upload = await imagekit.upload({
        file: file,
        fileName: namaFile,
      });

      let updated = await User.update(
        {
          avatar: upload.url,
          no_hp,
          kota,
          alamat,
        },
        query
      );
      return res.respondUpdated({ updated }, "Success Update Data");
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  getMyProfile: async (req, res) => {
    try {
      const myProfile = req.user;

      const findMyProfile = await User.findOne({ where: { id: myProfile.id } });
      return res.respondGet(findMyProfile, "success get my profile");
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
};
