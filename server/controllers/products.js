const models = require('../models');

module.exports.get = async (req, res) => {
  const {count, page} = req.query;
  const products = await models.products.getAllProducts(count, page);
  res.status(200).send(products)
}

