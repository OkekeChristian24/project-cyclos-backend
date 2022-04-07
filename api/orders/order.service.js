const { pool } = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO orders(buyer_addr, unique_id, total_amount, payment_unique_id, total_items) VALUES(?, ?, ?, ?, ?)',
            [ 
                data.buyer_addr,
                data.unique_id,
                data.total_amount,
                data.payment_unique_id,
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
            `SELECT * FROM orders ORDER BY created_at`,
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
            `SELECT orders.id, users.username, products.item_name, categories.category_name, shops.shop_name, products.image, orders.quantity, products.price, products.duration, orders.created_at FROM orders INNER JOIN users ON orders.user_id = users.id INNER JOIN products ON orders.product_id = products.id INNER JOIN shops ON products.shop_id = shops.id INNER JOIN categories ON products.category_id = categories.id WHERE products.shop_id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserOrders: (address, callBack) => {
        pool.query(
            `SELECT * FROM orders o INNER JOIN payments p ON p.order_id = o.id WHERE o.buyer_addr = ? ORDER BY o.created_at DESC`,
            [address],
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
    updateOrderStatus: (id, data, callBack) => {
        pool.query(
            'UPDATE orders SET status = ? WHERE id = ?',
            [
                data.status,
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