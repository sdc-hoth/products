const models = require('../models');

module.exports = {
  getProducts: async (req, res) => {
    const {count, page} = req.query;
    // console.log('productsssss here!!!!!!!!!!!!')
    try{
      const products = await models.products.getAllProducts(count, page);
      res.status(200).send(products)
    } catch(e) {
      console.log('err in getting products in controller', e)
    }

  },
  getProduct: async (req, res) => {
    const {product_id} = req.params;
    // console.log('product here!!!!!!!!!!!!', product_id)
    try{
      const product = await models.products.getProduct(product_id);
      res.status(200).send(product)
    } catch(e) {
      console.log('err in getting one product in controller', e)
    }

  },
  getRelated: async (req, res) => {
    const {product_id} = req.params;
    // console.log('related here!!!!!!!!!!!!', product_id)
    try {
      const related = await models.products.getRelated(product_id);
      res.status(200).send(related)
    } catch(e) {
      console.log('err in getting related in controller', e)
    }

  },
  getStyles: async (req, res) => {
    const {product_id} = req.params;
    // console.log('style  here!!!!!!!!!!!!', product_id)
    try {
      const styles = await models.products.getStyles(product_id);
      res.status(200).send(styles)
    } catch(e) {
      console.log('err in getting styles in controller', e)
    }

  }
}