const { validateCreate, validateEdit, validateStatusChange } = require('../../validation/orderValidation');

const { checkIfAdmin } = require("../../auth/order_validation");
const { 
    createOrder,
    getOrders,
    getUserOrders,
    getOrderById,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
} = require('./order.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

// => /order
router.post('/', validateCreate, createOrder);
router.get('/', getOrders);
router.get('/id/:id', getOrderById);
router.get('/user/:address', getUserOrders);
router.delete('/:id', deleteOrder);

// router.get('/shop/:id', getShopOrders);
// router.put('/:id', validateEdit, updateOrder);

// For admins
router.put('/:id/status',checkToken, checkIfAdmin, validateStatusChange, updateOrderStatus);

module.exports = router;