const express = require('express');
const router = express.Router();
const productController = require('./product.controller');

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
