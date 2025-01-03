const { Router } = require('express');
const { generateOrder, getOrders } = require('../controllers/orders');

const router = Router();

router.post('/', generateOrder);
router.get('/', getOrders);



module.exports = router;
