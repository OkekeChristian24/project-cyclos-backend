const { pool } = require('../../config/database');

module.exports = {
    createItem: (data, callBack) => {
        pool.query(
            'INSERT INTO sortedquote_items(sortedquote_id, product_link, quantity, item_weight, price) VALUES(?, ?, ?, ?, ?)',
            [
                data.sortedquote_id,
                data.product_link,
                data.quantity,
                data.item_weight,
                data.price
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    getSortedItems: callBack => {
        pool.query(
            'SELECT * FROM sortedquote_items',
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSortedItemById: (id, callBack) => {
        pool.query(
            'SELECT * FROM sortedquote_items WHERE id = ?',
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSortedItemsByQuoteId: (id, callBack) => {
        pool.query(
            'SELECT * FROM sortedquote_items WHERE sortedquote_id = ?',
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateSortedItem: (id, data, callBack) => {
        pool.query(
            'UPDATE sortedquote_items SET product_link = ?, quantity = ?, item_weight = ?, price = ? WHERE id = ?',
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
    deleteSortedItem: (id, callBack) => {
        pool.query(
            'DELETE FROM sortedquote_items WHERE id = ?',
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteSortedItemByQuoteId: (id, callBack) => {
        pool.query(
            'DELETE FROM sortedquote_items WHERE sortedquote_id = ?',
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};

/*
sortedquote_id
product_link
quantity
item_weight
price

*/