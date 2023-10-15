const nodemailer = require("nodemailer");
const keys = require("../config/keys");
const getConfigs = require("../config/getConfigs");

module.exports = async (subscriberMail, letterSubject, letterHtml, res) => {
  const configs = await getConfigs();

  console.log(configs.development.email.mailService);
  console.log(configs.development.email.mailUser);
  console.log(configs.development.email.mailPassword);


  //authorization for sending email
  let transporter = nodemailer.createTransport({
    service:
      process.env.NODE_ENV === "production"
        ? configs.production.email.mailService
        : configs.development.email.mailService,
    auth: {
      user:
        process.env.NODE_ENV === "production"
          ? configs.production.email.mailUser
          : configs.development.email.mailUser,
      pass:
        process.env.NODE_ENV === "production"
          ? configs.production.email.mailPassword
          : 'tabt oxxg tybk kwmm'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from:
      process.env.NODE_ENV === "production"
        ? configs.production.email.mailUser
        : configs.development.email.mailUser,
    to: subscriberMail,
    subject: letterSubject,
    html: letterHtml
  };

  const result = await transporter.sendMail(mailOptions);

  return result;
};
