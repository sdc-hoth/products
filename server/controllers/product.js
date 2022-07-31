const models = require('../models');

module.exports.get = async (req, res) => {
  const {product_id} = req.params;
  const product = await models.product.getProduct(product_id);
  res.status(200).send(product)
}