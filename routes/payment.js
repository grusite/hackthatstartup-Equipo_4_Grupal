const express = require('express');
const expressDeliver = require('express-deliver');
const router = express.Router();
const paymentcontroller = require('../controllers/paymentController');

expressDeliver(router);

router.get('/', paymentcontroller.listPayments);
router.get('/:reference', paymentcontroller.readPayment);
router.get('/:email', paymentcontroller.listByEmail);
router.post('/', paymentcontroller.addPayment);


module.exports = router;
