const { Router } = require('express');
const { generateOrder, getOrders, canceledOrder } = require('../controllers/orders');

const router = Router();

router.post('/', generateOrder);
router.get('/', getOrders);
router.patch('/canceled', canceledOrder);



module.exports = router;
