const nodemailer = require('nodemailer');
const { google } = require('googleapis');
// const ejs = require('ejs');

const {
    OAUTH_REFRESH_TOKEN,
    OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET,
    OAUTH_REDIRECT_URI,
    SENDER_MAIL
} = process.env;

const oauth2Client = new google.auth.OAuth2(
    OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET,
    OAUTH_REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: OAUTH_REFRESH_TOKEN });

module.exports = {
  validatePassword: (pass) => {
    let data = {
      success: true,
      message: {},
    };

    const lowercase = /(?=.*[a-z])/;
    const uppercase = /(?=.*[A-Z])/;
    const number = /(?=.*[0-9])/;
    const specialChar = /(?=.*[!@#\$%\^&\*])/;
    const eightChar = /(?=.{8,})/;

    if (!eightChar.test(pass)) {
      (data.success = false), (data.message.eight_char = 'password must contain min 8 character!');
    }

    if (!lowercase.test(pass)) {
      (data.success = false), (data.message.lowercase = 'password must contain lowercase character!');
    }

    if (!uppercase.test(pass)) {
      (data.success = false), (data.message.uppercase = 'password must contain uppercase character!');
    }

    if (!number.test(pass)) {
      (data.success = false), (data.message.number = 'password must contain number!');
    }

    if (!specialChar.test(pass)) {
      (data.success = false), (data.message.special_char = 'password must contain special character!');
    }

    return data;
  },

  sendEmail : async (to, subject , html) => {
    try {
      const accessToken = await oauth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_MAIL,
            clientId: OAUTH_CLIENT_ID,
            clientSecret: OAUTH_CLIENT_SECRET,
            refreshToken: OAUTH_REFRESH_TOKEN,
            accessToken: accessToken
        }
      });
      const mailOptions = {
        to,
        subject,
        html
      };
      const response = await transport.sendMail(mailOptions);
      return response;

    } catch (error) {
      return err;
    }
  }
};
