const Partner = require("../models/Partner");
const queryCreator = require("../commonHelpers/queryCreator");
const _ = require("lodash");
const filterParser = require("../commonHelpers/filterParser");
const Product = require("../models/Product");

exports.addPartner = (req, res, next) => {
  Partner.findOne({ customId: req.body.customId }).then(partner => {
    if (partner) {
      return res.status(400).json({
        message: `Partner with customId "${partner.customId}" already exists`
      });
    } else {
      const data = _.cloneDeep(req.body);
      const newPartner = new Partner(queryCreator(data));

      newPartner
        .save()
        .then(partner => res.status(200).json(partner))
        .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
        );
    }
  });
};

exports.updatePartner = (req, res, next) => {
  Partner.findOne({ customId: req.params.customId })
    .then(partner => {
      if (!partner) {
        return res.status(400).json({
          message: `Partner with customId "${req.params.customId}" is not found.`
        });
      } else {
        const data = _.cloneDeep(req.body);
        const updatedPartner = queryCreator(data);

        Partner.findOneAndUpdate(
          { customId: req.params.customId },
          { $set: updatedPartner },
          { new: true }
        )
          .then(partner => res.json(partner))
          .catch(err =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `
            })
          );
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.deletePartner = (req, res, next) => {
  Partner.findOne({ customId: req.params.customId }).then(async partner => {
    if (!partner) {
      return res.status(400).json({
        message: `Partner with customId "${req.params.customId}" is not found.`
      });
    } else {
      const partnerToDelete = await Partner.findOne({
        customId: req.params.customId
      });

      Partner.deleteOne({ customId: req.params.customId })
        .then(deletedCount =>
          res.status(200).json({
            message: `Partner witn name "${partnerToDelete.customId}" is successfully deleted from DB `,
            deletedDocument: partnerToDelete
          })
        )
        .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
        );
    }
  });
};

exports.getPartners = (req, res, next) => {
  Partner.find()
    .then(partners => res.status(200).json(partners))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.getPartnersNames = async (req, res) => {
  try {
    const partners = await Partner.find();
    const partnersNames = partners.map(partner => partner.name);
    res.json(partnersNames);
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.getPartnerById = (req, res, next) => {
  Partner.findOne({
    customId: req.params.customId
  })
    .then(partner => {
      if(!partner) {
        res.status(400).json({
          message: `Restaurant with customId ${req.params.customId} is not found`
        });
      } else {
        res.status(200).json(partner);
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.getPartnersFilterParams = async (req, res, next) => {
  const mongooseQuery = filterParser(req.query);
  const perPage = Number(req.query.perPage);
  const startPage = Number(req.query.startPage);
  const sort = req.query.sort;

  try {
    const partners = await Partner.find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort);

    const partnersQuantity = await Partner.find(mongooseQuery);

    res.json({ partners, partnersQuantity: partnersQuantity.length });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.searchPartners = async (req, res, next) => {
  if (!req.body.query) {
    res.status(400).json({ message: "Query string is empty" });
  }

  //Taking the entered value from client in lower-case and trimmed
  let query = req.body.query
    .toLowerCase()
    .trim()
    .replace(/\s\s+/g, " ");

  // Creating the array of key-words from taken string
  let queryArr = query.split(" ");

  // Finding ALL partners, that have at least one match
  let matchedPartners = await Partner.find({
    $text: { $search: query }
  });

  res.send(matchedPartners);
};
