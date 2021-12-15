const { validateCreate, validateEdit } = require('../../validation/paymentValidation');
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

router.post('/', validateCreate, createPayment);
router.get('/', getPayments);
router.get('/:id', getPaymentById);
router.get('/user/:id', getPaymentByUser);
router.put('/:id', validateEdit, updatePayment);
router.delete('/:id', deletePayment);

module.exports = router;