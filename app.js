const express = require('express');
const router = require('./routes/products');


const app = express();

app.use('/products', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});