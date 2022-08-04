require('dotenv').config()
require('newrelic');
const express = require('express');
const path = require('path');


const app = express();


const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.use(express.json())

app.get('/loaderio-4a9893ae9f2a54c3ce7dcb59361ab52c.txt', async(req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, 'loaderio-4a9893ae9f2a54c3ce7dcb59361ab52c.txt'))
  } catch (e) {
    console.log('errrrrrr here', e)
  }
})

app.use('/products', productsRoutes);
app.use('/cart', cartRoutes)

PORT = process.env.PORT || 3005;

app.listen(PORT);
console.log(`Listening at http://localhost:${PORT}`);