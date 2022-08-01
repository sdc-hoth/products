const controllers = require('../controllers');
const router = require('express').Router();

router.get('/:userToken', controllers.cart.getCart);
router.post('/', controllers.cart.postCart)

module.exports = router;