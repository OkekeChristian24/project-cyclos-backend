const { pool } = require('../config/database');

module.exports = {
    createOrderFulfiller: (data, callBack) => {
        pool.query(
            'INSERT INTO order_fulfillers(order_id, fulfiller_id, show_item) VALUES(?, ?, ?)',
            [ 
                data.order_id,
                data.fulfiller_id,
                data.show_item
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};