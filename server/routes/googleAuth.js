const router = require('express').Router();
const jwt = require("jsonwebtoken");
const { google } = require('googleapis');
const { verifyIdToken } = require('../controllers/googleAuth');
const keys = require("../config/keys");

// Load Customer model
const Customer = require("../models/Customer");

router.post(
    '/googleAuth',
    async (req, res) => {
        const googleAuthCode = req.body.code;

        const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL)
        const tokens = (await oauth2Client.getToken(googleAuthCode)).tokens

        oauth2Client.setCredentials(tokens)
    
        const result = await verifyIdToken(tokens.id_token, process.env.CLIENT_ID)

        // console.log(result)

        // Find customer by email
        Customer.findOne({
            $or: [{ email: result.email }]
        })
            .then(customer => {

                // Check for customer
                if (!customer) {
                    console.log(result);
                    return res.status(206).json(result);
                }

                const payload = {
                    id: customer.id,
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    isAdmin: customer.isAdmin
                }; 
                // Create JWT Payload
                // видалення поля пароля
                const userWithoutPassword = JSON.parse(JSON.stringify(customer));
                delete userWithoutPassword.password;
    
                // Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 36000 },
                    (err, token) => {
                        //todo: шото придумать з токеном
                        res.json({
                        success: true,
                        token: "Bearer " + token,
                        user: userWithoutPassword,
                        });
                    }
                );
            })
            .catch(err =>
            res.status(400).json({
                message: `Error happened on server: "${err}" `
            })
            );
    }
)

module.exports = router;
