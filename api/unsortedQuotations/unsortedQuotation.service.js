const { pool } = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO unsorted_quotations(sorter_id, total_items) VALUES(?, ?)',
            [
                data.sorter_id,
                data.total_items
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUnsortedQuotations: callBack => {
        pool.query(
            'SELECT * FROM unsorted_quotations',
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUnsortedQuotationByUser: (id, callBack) => {
        pool.query(
            'SELECT * FROM unsorted_quotations WHERE user_id = ?',
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }

        );
    },
    getUnsortedQuotationById: (id, callBack) => {
        pool.query(
            'SELECT * FROM unsorted_quotations WHERE id = ?',
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUnsortedQuotationBySorter: (id, callBack) => {
        pool.query(
            'SELECT * FROM unsorted_quotations WHERE sorter_id = ?',
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateUnsortedQuotation: (id, data, callBack) => {
        pool.query(
            'UPDATE unsorted_quotations SET sorter_id = ?, total_items = ? WHERE id = ?',
            [
                data.sorter_id,
                data.total_items,
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
    deleteUnsortedQuotation: (id, callBack) => {
        pool.query(
            'DELETE FROM unsorted_quotations WHERE id = ?',
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
