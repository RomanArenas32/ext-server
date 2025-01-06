const { Router } = require('express');
const { generateOrder, getOrders, canceledOrder, confirmOrder, getOrderByCode, getOrderById } = require('../controllers/orders');

const router = Router();

router.post('/', generateOrder);
router.get('/:code', getOrderByCode);
router.patch('/one/:id', getOrderById);
router.get('/', getOrders);
router.patch('/canceled/:id', canceledOrder);
router.patch('/confirm/:id', confirmOrder);




module.exports = router;
