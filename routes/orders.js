const { Router } = require('express');
const { generateOrder, getOrders, canceledOrder, confirmOrder } = require('../controllers/orders');

const router = Router();

router.post('/', generateOrder);
router.get('/', getOrders);
router.patch('/canceled/:id', canceledOrder);
router.patch('/confirm/:id', confirmOrder);




module.exports = router;
