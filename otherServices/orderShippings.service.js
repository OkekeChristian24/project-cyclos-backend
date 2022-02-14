const { pool } = require('../config/database');

module.exports = {
    createShippingAddress: (data, callBack) => {
        pool.query(
            'INSERT INTO order_shippings(order_id, order_unique_id, buyer_addr, phone, email, street, city, state, country, postal_code) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [ 
                data.order_id,
                data.order_unique_id,
                data.buyer_addr,
                data.phone,
                data.email,
                data.street,
                data.city,
                data.state,
                data.country,
                data.postal_code
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getShippingAddresses: callBack => {
        pool.query(
            `SELECT * FROM order_shippings`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getBuyerShippingAddress: (buyer_addr, callBack) => {
        pool.query(
            `SELECT * FROM orders WHERE buyer_addr = ?`,
            [buyer_addr],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        
        );
    },
    getShippingAddressById: (id, callBack) => {
        pool.query(
            `SELECT * FROM order_shippings WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        
        );
    },
    getShippingAddressByOrderId: (order_id, callBack) => {
        pool.query(
            `SELECT * FROM order_shippings WHERE order_id = ?`,
            [order_id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        
        );
    },
    getShippingAddressByOrderUniqueId: (order_unique_id, callBack) => {
        pool.query(
            `SELECT * FROM order_shippings WHERE order_unique_id = ?`,
            [order_unique_id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        
        );
    },
    updateShippingAddress: (id, data, callBack) => {
        pool.query(
            'UPDATE order_shippings SET phone = ?, email = ?, street = ?, city = ?, state = ?, country = ?, postal_code = ? WHERE id = ?',
            [ 
                data.phone,
                data.email,
                data.street,
                data.city,
                data.state,
                data.country,
                data.postal_code,
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
    deleteShippingAddress: (id, callBack) => {
        pool.query(
            'DELETE * FROM order_shippings WHERE id = ?',
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