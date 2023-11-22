const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const keys = require("../config/keys");
const getConfigs = require("../config/getConfigs");
const passport = require("passport");
const sendMail = require("../commonHelpers/mailSender");
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(10000000, 99999999);
const crypto = require("crypto");
const generatePasswordResetEmail = require('../views/emailForPasswordReset');

// Load Customer model
const Customer = require("../models/Customer");

// Load validation helper to validate all received fields
const validateRegistrationForm = require("../validation/validationHelper");

// Load helper for creating correct query to save customer to DB
const queryCreator = require("../commonHelpers/queryCreator");

// Controller for creating customer and saving to DB
exports.createCustomer = (req, res, next) => {
  // Clone query object, because validator module mutates req.body, adding other fields to object
  const initialQuery = _.cloneDeep(req.body);
  initialQuery.customerNo = rand();

  // Check Validation
  const { errors, isValid } = validateRegistrationForm(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Customer.findOne({ email: req.body.email })
    .then(customer => {
      if (customer) {
        return res.status(400).json({ message: `Email ${customer.email} already exists` });
      }

      // Create query object for customer for saving him to DB
      const newCustomer = new Customer(queryCreator(initialQuery));

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCustomer.password, salt, (err, hash) => {
          if (err) {
            res
              .status(400)
              .json({ message: `Error happened on server: ${err}` });

            return;
          }

          newCustomer.password = hash;
          newCustomer
            .save()
            .then(customer => {

              const payload = {
                id: customer.id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                isAdmin: customer.isAdmin
              };

              const userWithoutPassword = JSON.parse(JSON.stringify(customer));
              delete userWithoutPassword.password;

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 36000 },
                (err, token) => {
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
        });
      });
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

// Controller for customer login
exports.loginCustomer = async (req, res, next) => {
  const { errors, isValid } = validateRegistrationForm(req.body);

  // Check Validation
  if (!isValid) {
      return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  const configs = await getConfigs();

    // Find customer by email
  Customer.findOne({
    $or: [{ email: email }, { login: email }]
  })
    .then(customer => {

        // Check for customer
      if (!customer) {
        errors.email = "Customer is not found";
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, customer.password).then(isMatch => {
        if (isMatch) {
          // Customer Matched
          const payload = {
            id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            isAdmin: customer.isAdmin
          }; // Create JWT Payload
            // видалення поля пароля
            const userWithoutPassword = JSON.parse(JSON.stringify(customer));
            delete userWithoutPassword.password;

          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 36000 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
                user: userWithoutPassword,
              });
            }
          );
        } else {
          errors.password = "Password is incorrect";
          return res.status(400).json(errors);
        }
      });
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

// Controller for getting current customer
exports.getCustomer = (req, res) => {
  res.json(req.user);
};

// Controller for editing customer personal info
exports.editCustomerInfo = (req, res) => {
  // Clone query object, because validator module mutates req.body, adding other fields to object
  const initialQuery = _.cloneDeep(req.body);

  // Check Validation
  const { errors, isValid } = validateRegistrationForm(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Customer.findOne({ _id: req.user.id })
    .then(customer => {
      if (!customer) {
        errors.id = "Customer is not found";
        return res.status(404).json(errors);
      }

      const currentEmail = customer.email;
      const currentLogin = customer.login;
      let newEmail;
      let newLogin;

      if (req.body.email) {
        newEmail = req.body.email;

        if (currentEmail !== newEmail) {
          Customer.findOne({ email: newEmail }).then(customer => {
            if (customer) {
              errors.email = `Email ${newEmail} is already exists`;
              res.status(400).json(errors);
              return;
            }
          });
        }
      }

      if (req.body.login) {
        newLogin = req.body.login;

        if (currentLogin !== newLogin) {
          Customer.findOne({ login: newLogin }).then(customer => {
            if (customer) {
              errors.login = `Login ${newLogin} is already exists`;
              res.status(400).json(errors);
              return;
            }
          });
        }
      }

      // Create query object for qustomer for saving him to DB
      const updatedCustomer = queryCreator(initialQuery);

      Customer.findOneAndUpdate(
        { _id: req.user.id },
        { $set: updatedCustomer },
        { new: true }
      )
        .then(customer => {
          const userWithoutPassword = JSON.parse(JSON.stringify(customer));
          delete userWithoutPassword.password;
          res.json(userWithoutPassword);
        })
        .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
        );
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server:"${err}" `
      })
    );
};

// Controller for editing customer password
exports.updatePassword = (req, res) => {
  // Check Validation
  const { errors, isValid } = validateRegistrationForm(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // find our user by ID
  Customer.findOne({ _id: req.user.id }, (err, customer) => {
    let oldPassword = req.body.password;

    customer.comparePassword(oldPassword, function(err, isMatch) {
      if (!isMatch) {
        errors.password = "Password does not match";
        res.json(errors);
      } else {
    let newPassword = req.body.newPassword;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newPassword, salt, (err, hash) => {
        if (err) throw err;
        newPassword = hash;
        Customer.findOneAndUpdate(
          { _id: req.user.id },
          {
            $set: {
              password: newPassword
            }
          },
          { new: true }
        )
          .then(customer => {
            res.json({
              message: "Password successfully changed",
              customer: customer
            });
          })
          .catch(err =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `
            })
          );
        });
      });
      }
    });
  });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: 'This email is not registered. Check your email and try again.' });
    }

    const secret = keys.secretOrKey + customer.password;
    const token = jwt.sign({ email: customer.email, id: customer._id }, secret, {
      expiresIn: 900, // 15хв
    });

    const recoveryPasswordLink = `${process.env.REDIRECT_URL}/recovery-password/${customer._id}/${token}`;

    const subscriberMail = req.body.email;
    const letterSubject = 'Reset password';
    const letterHtml = generatePasswordResetEmail(customer.firstName, recoveryPasswordLink);

    const mailResult = await sendMail(
      subscriberMail,
      letterSubject,
      letterHtml,
      res
    );

    res.json({ mailResult, message: 'success' });

  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }
};


exports.resetPassword = async (req, res) => {
  const { id, token } = req.body;
  let newPassword = req.body.password;

  try {
    const customer = await Customer.findOne({ _id: id });
    if (!customer) {
      return res.status(404).json({ message: "User is not found" });
    }

    try {
      const secret = keys.secretOrKey + customer.password;
      const verify = jwt.verify(token, secret);

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
          if (err) throw err;
          newPassword = hash;
          Customer.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                password: newPassword
              }
            },
            { new: true }
          )
            .then(customer => {
              res.json({
                message: "Password was successfully changed",
                customer: customer
              });
            })
            .catch(err =>
              res.status(400).json({
                message: `Error happened on server: "${err}" `
              })
            );
        });
      });

    } catch (err) {
      res.status(400).json({
        message: 'Invalid or expired password reset token'
      });
    }

  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }
};