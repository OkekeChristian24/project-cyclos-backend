const {
    createPayment,
    getPayments,
    getPaymentById,
    getPaymentByUser,
    updatePayment,
    deletePayment
} = require('./payment.controller');

const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post('/', createPayment);
router.get('/', checkToken, getPayments);
router.get('/:id', checkToken, getPaymentById);
router.get('/user/:id', checkToken, getPaymentByUser);
router.put('/:id', checkToken, updatePayment);
router.delete('/:id', checkToken, deletePayment);
