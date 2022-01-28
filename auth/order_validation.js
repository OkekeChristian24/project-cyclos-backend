const { getOrderById } = require('../api/orders/order.service');
const { getAdminById } = require('../api/admin/admin.service');
module.exports = {
    checkUser: (req, res, next) => {
        // Check if user is an admin
        const adminId = req.user.id
        getAdminById(adminId, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Oops... Something went wrong.'
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Oops... Something went wrong.'
                });
            }

            if (results.length > 1) {
                return res.json({
                    success: 0,
                    message: 'Invalid user.'
                });
            }else if(results.length === 1){
                next();
            }else{
                
                const addressId = req.params.id;
                getOrderById(addressId, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.json({
                            success: 0,
                            message: 'Oops... Something went wrong'
                        });
                    }
                    if (!results) {
                        return res.json({
                            success: 0,
                            message: 'Query error'
                        });
                    }
        
                    // Check if user_id is same with req.user.id
                    if(results[0].user_id === req.user.id){
                        next();
                    }else{
                        return res.json({
                            success: 0,
                            message: 'Access denied. Not authorized'
                        });
                    }
                });
            }

        });
        
    },
    checkIfAdmin: (req, res, next) => {
        // Check if user is an admin
        const adminId = req.user.id
        getAdminById(adminId, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Oops... Something went wrong.'
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Oops... Something went wrong.'
                });
            }

            if (results.length > 1) {
                return res.status(204).json({
                    success: 0,
                    message: 'Invalid user.'
                });
            }else if(results.length === 1){
                next();
            }else{
                
                return res.status(403).json({
                    success: 0,
                    message: 'Access denied. Not authorized'
                });
            }

        });
        
    }
};