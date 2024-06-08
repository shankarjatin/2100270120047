// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/:companyname/categories/:categoryname/products', productController.getTopProducts);
router.get('/:companyname/categories/:categoryname/products/:productid', productController.getProductById);

module.exports = router;
