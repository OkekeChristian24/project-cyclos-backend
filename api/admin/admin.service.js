const { pool } = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO admins(first_name, last_name, email, phone, password) VALUES(?, ?, ?, ?, ?)',
            [ 
                data.first_name, 
                data.last_name, 
                data.email,
                data.phone, 
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAdmins: callBack => {
        pool.query(
            `SELECT id, first_name, last_name, email, phone FROM admins`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAdminById: (id, callBack) => {
        pool.query(
            `SELECT id, first_name, last_name, email, phone FROM admins WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateAdmin: (id, data, callBack) => {
        pool.query(
            `UPDATE admins SET first_name = ?, last_name = ?, email = ?, phone = ?, password = ? WHERE id = ?`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.phone,
                data.password,
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteAdmin: (id, callBack) => {
        pool.query(
            `DELETE FROM admins WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getAdminByEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM admins WHERE email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
};