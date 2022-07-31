const controllers = require('./controllers');
const router = require('express').Router();

router.get('/', controllers.products.get);
router.get('/:product_id', controllers.product.get);
router.get('/:product_id/styles', controllers.styles.get);
router.get('/:product_id/related', controllers.related.get);


module.exports = router;