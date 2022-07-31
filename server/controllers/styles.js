const models = require('../models');

module.exports.get = async (req, res) => {
  const {product_id} = req.params;
  const styles = await models.styles.getStyles(product_id);
  res.status(200).send(styles)
}