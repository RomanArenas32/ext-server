const { Router } = require('express');
const { createProduct, getProducts, getProductById } = require('../controllers/products');

const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);  

module.exports = router;
