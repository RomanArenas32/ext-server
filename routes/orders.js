const { Router } = require('express');
const { generateOrder, getOrders, canceledOrder, confirmOrder, getOrderByCode } = require('../controllers/orders');

const router = Router();

router.post('/', generateOrder);
router.get('/:code', getOrderByCode);
router.get('/', getOrders);
router.patch('/canceled/:id', canceledOrder);
router.patch('/confirm/:id', confirmOrder);




module.exports = router;
