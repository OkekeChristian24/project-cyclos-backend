const { pool } = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO sorters(email, password, first_name, last_name) VALUES(?, ?, ?, ?)',
            [
                data.email,
                data.password,
                data.first_name,
                data.last_name,
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSorters: callBack => {
        pool.query(
            'SELECT * FROM sorters',
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        
        );
    },
    getSorterById: (id, callBack) => {
        pool.query(
            'SELECT * FROM sorters WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSorterByEmail: (email, callBack) => {
        pool.query(
            'SELECT * FROM sorters WHERE email = ?',
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateSorter: (id, data, callBack) => {
        pool.query(
            'UPDATE sorters SET password = ?, first_name = ?, last_name = ?, status = ? WHERE id = ?',
            [
                data.password,
                data.first_name,
                data.last_name,
                data.status,
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
    deleteSorter: (id, callBack) => {
        pool.query(
            'DELETE FROM sorters WHERE id = ?',
            [id],
            (error, results, fields) => {
                console.log(results);
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
};