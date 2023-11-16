const sendMail = require("../commonHelpers/mailSender");

exports.submitSupportRequest = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const supportMail = 'eatly.supp@gmail.com';
    const letterSubject = 'New customer request';
    const letterHtml = `<p>Request from: ${name}</p>
                        <p>Email: ${email}</p>
                        <p>Message: ${message}</p>`;

    const mailResult = await sendMail(
      supportMail,
      letterSubject,
      letterHtml,
    );

    res.json({ mailResult, message: 'Request email was successfully sent' });

  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }
};