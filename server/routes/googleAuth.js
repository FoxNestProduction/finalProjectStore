const router = require('express').Router();
const { google } = require('googleapis');
const { verifyIdToken } = require('../controllers/googleAuth');

// Load Customer model
const Customer = require("../models/Customer");

router.post(
    '/googleAuth',
    async (req, res) => {
        const googleAuthCode = req.body.code;

        const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 'http://localhost:3000')
        const tokens = (await oauth2Client.getToken(googleAuthCode)).tokens

        oauth2Client.setCredentials(tokens)
    
        const result = await verifyIdToken(tokens.id_token, process.env.CLIENT_ID)

        // console.log(result)

        // Find customer by email
        Customer.findOne({
            $or: [{ email: result.email }, { login: result.email }]
        })
            .then(customer => {
                console.log(customer._id)

                // Check for customer
                if (!customer) {
                    console.log(customer);

                    errors.email = "Customer not found";
                    return res.status(404).json(errors);
                }
                return res.status(200).json(customer);

            })
            .catch(err =>
            res.status(400).json({
                message: `Error happened on server: "${err}" `
            })
            );
    }
)

module.exports = router;
