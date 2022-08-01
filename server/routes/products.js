const controllers = require('../controllers');
const router = require('express').Router();



router.get('/:product_id/styles', controllers.products.getStyles);
router.get('/:product_id/related', controllers.products.getRelated);
router.get('/:product_id', controllers.products.getProduct);
router.get('/', controllers.products.getProducts);


module.exports = router;