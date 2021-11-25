const { pool } = require('../../config/database');

module.exports = {
    registerUser: (data, callBack) => {
        pool.query(
            'INSERT INTO users(wallet) VALUES(?)',
            [data.wallet],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUsers: callBack => {
        pool.query(
            'SELECT * FROM users',
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserById: (id, callBack) => {
        pool.query(
            'SELECT * FROM users WHERE id = ?',
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
        
    },
    getUserByWallet: (wallet, callBack) => {
        pool.query(
            'SELECT * FROM users WHERE wallet = ?',
            [wallet],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
        
    },
    updateUser: (id, data, callBack) => {
        pool.query(
            'UPDATE users SET wallet = ? WHERE id = ?',
            [
                data.wallet,
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
    deleteUser: (id, callBack) => {
        pool.query(
            'DELETE FROM users WHERE id = ?',
            [id],
            (error, results, fields) => {
                console.log("Results: ", results);
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};