const { pool } = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO users_receive_address(user_id, address_line1, address_line2, city, postal_code, country, phone) VALUES(?, ?, ?, ?, ?, ?, ?)',
            [ 
                data.user_id,
                data.address_line1,
                data.address_line2,
                data.city,
                data.postal_code,
                data.country,
                data.phone,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAddresses: callBack => {
        pool.query(
            `SELECT * FROM users_receive_address`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserAddress: (id, callBack) => {
        pool.query(
            `SELECT * FROM users_receive_address WHERE user_id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        
        );
    },
    getAddressById: (id, callBack) => {
        pool.query(
            `SELECT * FROM users_receive_address WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        
        );
    },
    updateAddress: (id, data, callBack) => {
        pool.query(
            'UPDATE users_receive_address SET address_line1 = ?, address_line2 = ?, city = ?, postal_code = ?, country = ?, phone = ? WHERE id = ?',
            [ 
                data.address_line1,
                data.address_line2,
                data.city,
                data.postal_code,
                data.country,
                data.phone,
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
    deleteAddress: (id, callBack) => {
        pool.query(
            'DELETE * FROM users_receive_address WHERE id = ?',
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