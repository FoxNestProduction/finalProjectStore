const Product = require("../models/Product");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);

const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");

exports.addImages = (req, res, next) => {
  if (req.files.length > 0) {
    res.json({
      message: "Photos are received"
    });
  } else {
    res.json({
      message:
        "Something wrong with receiving photos at server. Please, check the path folder"
    });
  }
};

exports.addProduct = (req, res, next) => {
  const productFields = _.cloneDeep(req.body);

  const products = Product.find();
  const productsItemNo = products.map(product => product.itemNo);
  const lastItemNo = Math.max(...productsItemNo);
  productFields.itemNo = lastItemNo + 1;

  try {
    productFields.name = productFields.name
      .toLowerCase()
      .trim()
      .replace(/\s\s+/g, " ");

    // const imageUrls = req.body.previewImages.map(img => {
    //   return `/img/products/${productFields.itemNo}/${img.name}`;
    // });

    // productFields.imageUrls = _.cloneDeep(imageUrls);
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }

  const updatedProduct = queryCreator(productFields);

  const newProduct = new Product(updatedProduct);

  newProduct
    .save()
    .then(product => res.json(product))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.updateProduct = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then(product => {
      if (!product) {
        return res.status(400).json({
          message: `Product with id "${req.params.id}" is not found.`
        });
      } else {
        const productFields = _.cloneDeep(req.body);

        if(productFields.name) {
          try {
            productFields.name = productFields.name
              .toLowerCase()
              .trim()
              .replace(/\s\s+/g, " ");
          } catch (err) {
            res.status(400).json({
              message: `Error happened on server: "${err}" `
            });
          }
        }

        const updatedProduct = queryCreator(productFields);

        Product.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedProduct },
          { new: true }
        )
          .then(product => res.json({status: 'ok', product}))
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

exports.getProducts = (req, res, next) => {

  // res.send('Here');
  const perPage = Number(req.query.perPage);
  const startPage = Number(req.query.startPage);
  const sort = req.query.sort;

  Product.find()
    .skip(startPage * perPage - perPage)
    .limit(perPage)
    .sort(sort)
    .then(products => res.send(products))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.getProductsNames = async (req, res) => {
  try {
    const products = await Product.find();
    const productsNames = products.map(product => product.name);
    res.json(productsNames);
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.getProductsCategories = async (req, res) => {
  try {
    const products = await Product.find();
    const productsCategories = products.map(product => product.filterCategories);
    const uniqueProductsCategories = Array.from(new Set(productsCategories));
    res.json(uniqueProductsCategories);
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.getProductById = (req, res, next) => {
  Product.findOne({
    itemNo: req.params.itemNo
  })
    .then(product => {
      if (!product) {
        res.status(400).json({
          message: `Product with itemNo ${req.params.itemNo} is not found`
        });
      } else {
        res.json(product);
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.getProductsFilterParams = async (req, res, next) => {
  const mongooseQuery = filterParser(req.query);
  const perPage = Number(req.query.perPage);
  const startPage = Number(req.query.startPage);
  const sort = req.query.sort;

  if (mongooseQuery.restaurant_name) {
    mongooseQuery.restaurant_name = new RegExp(mongooseQuery.restaurant_name, "i");
  }

  try {
    const products = await Product.find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort);

    const productsQuantity = await Product.find(mongooseQuery);

    res.json({ products, productsQuantity: productsQuantity.length });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.searchProducts = async (req, res, next) => {
  if (!req.body.query) {
    res.status(400).json({ message: "Query string is empty" });
  }

  //Taking the entered value from client in lower-case and trimmed
  let query = req.body.query
    .toLowerCase()
    .trim()
    .replace(/\s\s+/g, " ");

  // Creating the array of key-words from taken string
  // let queryArr = query.split(" ");

  // adding double quotes to search by the whole phrase
  // const phraseQuery = `\"${query}\"`;

  // Finding ALL products, that have at least one match
  // let matchedProducts = await Product.find({
  //   $text: { $search: query }
  // });
  let matchedProducts = await Product.find(
    { $text: { $search: query } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });

  res.send(matchedProducts);
};
