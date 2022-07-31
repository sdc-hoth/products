const models = require('../models');

module.exports.get = async (req, res) => {
  const {product_id} = req.params;
  const related = await models.related.getRelated(product_id);
  res.status(200).send(related)
}