const { pool } = require('../config/database');


module.exports = {
    getFulfillers: callBack => {
        pool.query(
            `SELECT * FROM fulfillers ORDER BY created_at`,
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        
        );
    },
    getFulfillersById: (id, callBack) => {
        pool.query(
            `SELECT * FROM fulfillers WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        
        );
    },
    getFulfillersByUsername: (username, callBack) => {
        pool.query(
            `SELECT * FROM fulfillers WHERE username = ?`,
            [username],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        
        );
    },
    getFulfillersCount: callBack => {
        pool.query(
            `SELECT COUNT(*) AS count FROM fulfillers`,
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        
        );
    }


};