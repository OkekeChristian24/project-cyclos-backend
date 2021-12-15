const { pool } = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO orders(user_id, total_amount, payment_id, total_items) VALUES(?, ?, ?, ?)',
            [ 
                data.user_id,
                data.total_amount,
                data.payment_id,
                data.total_items
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getOrders: callBack => {
        pool.query(
            // `select orders.id, users.username, products.item_name, categories.category_name, shops.shop_name, products.image, orders.quantity, products.price, products.duration, orders.created_at from orders inner join users on orders.user_id = users.id inner join products on orders.product_id = products.id inner join shops on products.shop_id = shops.id inner join categories on products.category_id = categories.id`,
            `SELECT * FROM orders`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getShopOrders: (id, callBack) => {
        pool.query(
            // `select id, shop_id, name, created_at from categories where id = ?`,
            `select orders.id, users.username, products.item_name, categories.category_name, shops.shop_name, products.image, orders.quantity, products.price, products.duration, orders.created_at from orders inner join users on orders.user_id = users.id inner join products on orders.product_id = products.id inner join shops on products.shop_id = shops.id inner join categories on products.category_id = categories.id where products.shop_id= ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserOrders: (id, callBack) => {
        pool.query(
            `SELECT * FROM orders WHERE user_id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        
        );
    },
    getOrderById: (id, callBack) => {
        pool.query(
            // `select id, shop_id, name, created_at from categories where id = ?`,
            `SELECT * FROM orders WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateOrder: (id, data, callBack) => {
        pool.query(
            `UPDATE orders SET total_amount = ?, payment_id = ?, total_items = ? WHERE id = ?`,
            [
                data.total_amount,
                data.payment_id,
                data.total_items,
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log(results);
                return callBack(null, results);
            }
        );
    },
    deleteOrder: (id, callBack) => {
        pool.query(
            `DELETE FROM orders WHERE id = ?`,
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