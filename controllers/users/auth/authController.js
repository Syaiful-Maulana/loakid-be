const { User } = require("../../../models");
const helper = require("../../../helpers");
const helperPass = require("../../../helpers/password");
const validator = require("fastest-validator");
const v = new validator();
const bcrypt = require("bcrypt");
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");

const {
  JWT_SECRET_KEY,
  SERVER_ROOT_URI,
  SERVER_LOGIN_ENDPOINT,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
} = process.env;

const oauth2Client = new google.auth.OAuth2(
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  `${SERVER_ROOT_URI}/${SERVER_LOGIN_ENDPOINT}`
);

function generateAuthUrl() {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    response_type: "code",
    scope: scopes,
  });

  return url;
}

async function setCredentials(code) {
  return new Promise(async (resolve, reject) => {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      return resolve(tokens);
    } catch (err) {
      return reject(err);
    }
  });
}

function getUserInfo() {
  return new Promise(async (resolve, reject) => {
    try {
      var oauth2 = google.oauth2({
        auth: oauth2Client,
        version: "v2",
      });

      const data = oauth2.userinfo.get((err, res) => {
        if (err) {
          return reject(err);
        }

        return resolve(res);
      });
    } catch (err) {
      return reject(err);
    }
  });
}

module.exports = {
  register: async (req, res) => {
    try {
      const schema = {
        nama: "string|required",
        email: "email|required",
        password: "string|required",
      };

      const isExist = await User.findOne({ where: { email: req.body.email } });
      if (isExist) return res.respondAlreadyExist("Email already registered!");

      const validate = v.validate(req.body, schema);
      if (validate.length) return res.respondBadRequest(validate);
      const { password } = req.body;

      const isPassOk = helperPass.validatePassword(password);
      if (!isPassOk.success) return res.respondBadRequest(isPassOk.message);

      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        ...req.body,
        password: encryptedPassword,
        // user_type: "basic",
      });
      return res.respondCreated(newUser, "Success Register Data");
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  authGoogle: async (req, res) => {
    try {
      const code = req.query.code;

      if (!code) {
        const loginUrl = generateAuthUrl();
        return res.redirect(loginUrl);
      }
      await setCredentials(code);

      const { data } = await getUserInfo();
      const user = {
        nama: data.name,
        email: data.email,
        user_type: "google",
      };

      const isRegistered = await User.findOne({
        where: { email: user.email },
      });

      if (!isRegistered) {
        await User.create({
          ...user,
        });
      } else {
        const userType = await User.findOne({
          where: { email: user.email, user_type: "google" },
        });
        if (!userType)
        return res.respondAlreadyExist("Email already registered!");
      }
      
      const findUser = await User.findOne({ where: { email: user.email } });
      const token = jwt.sign({id:findUser.id, ...user}, JWT_SECRET_KEY);
      
      return res.respondCreated(
        {id: findUser.id, ...user, token },
        "successfully authentication with google oauth2"
      );
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) return res.respondBadRequest("User not found!");

      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) return res.respondBadRequest("Wrong password!");

      const data = {
        id: user.id,
        nama: user.name,
        email: user.email,
        password: user.password,
      };
      const token = jwt.sign(data, JWT_SECRET_KEY, { expiresIn: "3h" });
      return res.respondCreated({ ...data, token }, "login success!");
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ where: { email } });
      if (user) {
        const dataTemp = {
          id: user.id,
          nama: user.nama,
          email: user.email,
        };

        const token = jwt.sign(dataTemp, JWT_SECRET_KEY, {
          expiresIn: "30m",
        });

        const link = `${req.protocol}://${req.get(
          "host"
        )}/api/v1/auth/reset-password?token=${token}`;

        const data = {
          ...dataTemp,
          link: link,
        };

        const html = `
                <p>hi ${user.nama}, silahkan klik <a href="${link}" target="_blank">disini</a> untuk mengatur ulang kata sandi anda.</p>
                <p>link : ${link}</p>
                `;
        helper.sendEmail(user.email, "Reset Your Password", html);
        return res.respondSuccess(data, "silahkan cek email anda");
      }

      return res.respondSuccess(null, "email lu gada");
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  resetPass: async (req, res) => {
    try {
      const token = req.query.token;
      const { new_password, confirm_new_password } = req.body;

      if (new_password != confirm_new_password)
        return res.respondBadRequest(
          "konfirmasi password harus sama dengan password baru"
        );

      const data = await jwt.verify(token, JWT_SECRET_KEY);

      const encryptedPassword = await bcrypt.hash(new_password, 10);

      let query = {
        where: {
          email: data.email,
        },
      };

      let updated = await User.update(
        {
          password: encryptedPassword,
        },
        query
      );

      return res.respondSuccess(updated, "Successfully Changed Password!");
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
};
