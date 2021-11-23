const { pool } = require('../../config/database');

module.exports = {
    create: (data, callBack) => {},
    createMultiItems: () => {},
    getOrderItems: callBack => {},
    getOrderItemById: (id, callBack) => {},
    getItemsByOrderId: (id, callBack) => {},
    updateOrderItem: (id, data, callBack) => {},
    deleteOrderItem: (id, callBack) => {}
};
