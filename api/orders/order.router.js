const { validateCreate, validateEdit } = require('../../validation/orderValidation');
const { 
    createOrder,
    getOrders,
    getShopOrders,
    getUserOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
} = require('./order.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post('/', validateCreate, createOrder);
router.get('/', getOrders);
// router.get('/shop/:id', getShopOrders);
router.get('/user/:id', getUserOrders);
router.get('/:id', getOrderById);
router.put('/:id', validateEdit, updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;