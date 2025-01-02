const { Router } = require('express');
const { createService, getServices, getServiceById } = require('../controllers/services');


const router = Router();

router.post('/', createService);
router.get('/', getServices);
router.get('/:id', getServiceById);  


module.exports = router;
