const { pool } = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO payments(order_id, amount, network_id, asset_id, tx_hash) VALUES(?, ?, ?, ?, ?)',
            [
                data.order_id,
                data.amount,
                data.network_id,
                data.asset_id,
                data.tx_hash,
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getPayments: callBack => {
        pool.query(
            'SELECT * FROM payments',
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getPaymentById: (id, callBack) => {
        pool.query(
            `SELECT * FROM payments WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getPaymentByUser: (id, callBack) => {
        pool.query(
            `SELECT * FROM payments p INNER JOIN orders o ON p.order_id = o.id WHERE o.user_id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updatePayment: (id, data, callBack) => {
        pool.query(
            `UPDATE payments SET amount = ?, network_id = ?, asset_id = ?, tx_hash = ? WHERE id = ?`,
            [
                data.amount,
                data.network_id,
                data.asset_id,
                data.tx_hash,
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deletePayment: (id, callBack) => {
        pool.query(
            `DELETE FROM payments WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};