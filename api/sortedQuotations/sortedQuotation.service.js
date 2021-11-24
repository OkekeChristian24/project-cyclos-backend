const { pool } = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO sorted_quotations(user_id, sorter_id, total_items, total_amount) VALUES(?, ?, ?, ?)', 
            [
                data.user_id,
                data.sorter_id,
                data.total_items,
                data.total_amount
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSortedQuotations: callBack => {
        pool.query(
            'SELECT * FROM sorted_quotations',
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSortedQuotationByUser: (id, callBack) => {
        pool.query(
            'SELECT * FROM sorted_quotations WHERE user_id = ?',
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSortedQuotationById: (id, callBack) => {
        pool.query(
            'SELECT * FROM sorted_quotations WHERE id = ?',
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSortedQuotationBySorter: (id, callBack) => {
        pool.query(
            'SELECT * FROM sorted_quotations WHERE sorter_id = ?',
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateSortedQuotation: (id, data, callBack) => {
        pool.query(
            'UPDATE sorted_quotations SET total_items = ?, total_amount = ? WHERE id = ?',
            [
                data.total_items,
                data.total_amount,
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
    deleteSortedQuotation: (id, callBack) => {
        pool.query(
            'DELETE FROM sorted_quotations WHERE id = ?',
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

