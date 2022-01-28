const { validateCreate, validateEdit, validateStatusChange } = require('../../validation/orderValidation');

const { checkIfAdmin } = require("../../auth/order_validation");
const { 
    createOrder,
    getOrders,
    getShopOrders,
    getUserOrders,
    getOrderById,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
} = require('./order.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post('/', validateCreate, createOrder);
router.get('/', getOrders);
// router.get('/shop/:id', getShopOrders);
router.get('/:id', getOrderById);
router.get('/user/:id', getUserOrders);
router.delete('/:id', deleteOrder);
// router.put('/:id', validateEdit, updateOrder);

// For admins
router.put('/:id/status',checkToken, checkIfAdmin, validateStatusChange, updateOrderStatus);

module.exports = router;