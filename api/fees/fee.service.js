const { pool } = require('../../config/database');


module.exports = {
    getFees: callBack => {
        pool.query(
            `SELECT * FROM fees`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getFeesByCompany: (company, callBack) => {
        pool.query(
            `SELECT charge_percent, tax_percent FROM fees WHERE company = ?`,
            [company],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};