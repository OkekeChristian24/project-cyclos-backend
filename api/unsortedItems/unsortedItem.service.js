const { pool } = require('../../config/database');

module.exports = {
    createItem: (data, callBack) => {
        pool.query(
            'INSERT INTO unsortedquote_items(unsortedquote_id, product_link, quantity) VALUES(?, ?, ?)',
            [
                data.unsortedquote_id,
                data.product_link,
                data.quantity
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUnsortedItems: callBack => {
        pool.query(
            'SELECT * FROM unsortedquote_items',
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUnsortedItemById: (id, callBack) => {
        pool.query(
            'SELECT * FROM unsortedquote_items WHERE id = ?',
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUnsortedItemsByQuoteId: (id, callBack) => {
        pool.query(
            'SELECT * FROM unsortedquote_items WHERE unsortedquote_id = ?',
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateUnsortedItem: (id, data, callBack) => {
        pool.query(
            'UPDATE unsortedquote_items SET product_link = ?, quantity = ? WHERE id = ?',
            [
                data.product_link,
                data.quantity,
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
    deleteUnsortedItem: (id, callBack) => {
        pool.query(
            'DELETE FROM unsortedquote_items WHERE id = ?',
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteUnsortedItemByQuoteId: (id, callBack) => {
        pool.query(
            'DELETE FROM unsortedquote_items WHERE unsortedquote_id = ?',
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

//unsortedquote_id
//product_link
//quantity
/*

{
    username: "ekrizz_24",
    password: "mypassword",
    products: [
        {
            product_link: "",
            quantity: 2
        },
        {
            product_link: "",
            quantity: 1
        }
    ]
}

*/