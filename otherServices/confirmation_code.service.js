const { pool } = require('../config/database');

module.exports = {
    insertCode: (data, callBack) => {
        pool.query(
            'INSERT INTO confirmation_code(user_id, code) values(?, ?)',
            [ data.user_id, data.code],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getCodes: callBack => {
        pool.query(
            'SELECT user_id, code FROM confirmation_code',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getCodeByUserId: (id, callBack) => {
        pool.query(
            'SELECT user_id, code FROM confirmation_code WHERE user_id = ?',
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getCodeByCode: (code, callBack) => {
        pool.query(
            'SELECT user_id, code FROM confirmation_code WHERE code = ?',
            [code],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};