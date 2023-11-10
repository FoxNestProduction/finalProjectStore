module.exports = (name, link) => {
  return `<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta content="telephone=no" name="format-detection">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
      <title>Document</title>
  </head>
  
  <body style="font-family: 'Inter', sans-serif;">
      <div style="background-color: #F9F9F9; padding: 10%;">
          <div
              style="color: #2B2B2B; background-color: #FFF; text-align: center; padding: 20px; font-size: 16px; border-radius: 16px;">
              <h3 style="margin: 0; font-weight: 600;">Hi ${name},</h3>
              <p style="color: #676767; font-size: 14px">Your email has been confirmed.</p>
              <p style="font-weight: 600;">Follow the link to reset your password: </p>
              <a href="${link}" style="display: block;
                  text-decoration: none; 
                  margin: 30px auto;
                  padding: 12px 15px;
                  border-radius: 16px;
                  background-color: #6C5FBC;
                  color: #F9F9F9;
                  font-size: 14px;
                  width: fit-content;
              ">
                      Reset Password
              </a>
              <p style="color: #676767; font-size: 12px">If you didn't make this request simply ignore this email.</p>
          </div>
      </div>
  </body>
</html>`
};