require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
// const path = require("path");
// const ejs = require("ejs");

const {
  OAUTH_REFRESH_TOKEN,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URI,
  SENDER_MAIL,
} = process.env;

const oauth2Client = new google.auth.OAuth2(
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: OAUTH_REFRESH_TOKEN });

module.exports = {
  sendEmail: async (to, subject, html) => {
    try {
      const accessToken = await oauth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: SENDER_MAIL,
          clientId: OAUTH_CLIENT_ID,
          clientSecret: OAUTH_CLIENT_SECRET,
          refreshToken: OAUTH_REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });

      const mailOptions = {
        to,
        subject,
        html,
      };

      const response = await transport.sendMail(mailOptions);
      return response;
    } catch (err) {
      return err;
    }
  },

  // fix yet
  mailTemplate: (fileName, data) => {
    const location = path.join(__dirname, `/../views/template/${fileName}`);
    return new Promise((resolve, reject) => {
      ejs.renderFile(location, data, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
};
