const { pool } = require('../../config/database');

module.exports = {
    createItem: (data, callBack) => {
        pool.query(
            'INSERT INTO order_items(order_id, product_link, domain, asin, quantity, item_weight, price) VALUES(?, ?, ?, ?, ?, ?, ?)',
            [
                data.order_id,
                data.product_link,
                data.domain,
                data.asin,
                data.quantity,
                data.item_weight,
                data.price
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getOrderItems: callBack => {
        pool.query(
            'SELECT * FROM order_items',
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getOrderItemById: (id, callBack) => {
        pool.query(
            'SELECT * FROM order_items WHERE id = ?',
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getItemsByOrderId: (id, callBack) => {
        pool.query(
            'SELECT * FROM order_items WHERE order_id = ?',
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateOrderItem: (id, data, callBack) => {
        pool.query(
            'UPDATE order_items SET product_link = ?, quantity = ?, item_weight = ?, price = ? WHERE id = ?',
            [
                data.product_link,
                data.quantity,
                data.item_weight,
                data.price,
                id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteOrderItem: (id, callBack) => {
        pool.query(
            'DELETE FROM order_items WHERE id = ?',
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteOrderItemByOrderId: (orderId, callBack) => {
        pool.query(
            'DELETE FROM order_items WHERE order_id = ?',
            [orderId],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};
