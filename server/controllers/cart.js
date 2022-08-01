const models = require('../models');

module.exports = {
  getCart: async(req, res) => {
    const {userToken} = req.params;
    const data = await models.cart.getCart(userToken);
    res.status(200).send(data)
  },
  postCart: async(req, res) => {
    const {user_token, sku_id} = req.body;
    console.log('post a cart!!!!!!!!', req.body)
    await models.cart.createCart(user_token, sku_id)
    res.status(201).send('created')
  }
}