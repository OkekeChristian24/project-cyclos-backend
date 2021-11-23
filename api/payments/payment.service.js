const { pool } = require('../../config/database');

module.exports = {
    create: (data, callBack) => {},
    getPayments: callBack => {},
    getPaymentById: (id, callBack) => {},
    getPaymentByUser: (id, callBack) => {},
    updatePayment: (id, data, callBack) => {},
    deletePayment: (id, callBack) => {}
};