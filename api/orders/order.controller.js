const { validationResult } = require('express-validator');
const { 
    create,
    getOrders,
    getShopOrders,
    getUserOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
 } = require('./order.service');

module.exports = {
    createOrder: (req, res) => {
        const errorsArr = [];
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            const errors = Object.values(validationErrors.mapped());
            errors.forEach(eachError => {
                errorsArr.push(eachError.msg);
            });
            // req.flash("errors", errorsArr);
            return res.json({
                success: 0,
                isDataValid: 0,
                message: errorsArr
            });
        }
 
        const body = req.body;
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                // req.flash("errors", ["Database connection failed"]);
                return res.json({
                    success: 0,
                    message: 'Database query error'
                });
            }

            // req.flash("success", "Order placed successfully");
            return res.json({
                success: 1,
                message: 'Order placed successfully!'
            });
        });
    },
    getOrders: (req, res) => {
        getOrders((err, results) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Database query error'
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Query error'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getShopOrders: (req, res) => {
        const id = req.params.id;
        getShopOrders(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Database query error'
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'No order found'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUserOrders: (req, res) => {
        const id = req.params.id;
        getUserOrders(id, (err, results) => {
            if(err){
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Database query error'
                });
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Query error'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getOrderById: (req, res) => {
        const id = req.params.id;
        getOrderById(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Database query error'
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Query error'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateOrder: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        updateOrder(id, body, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Oops something went wrong'
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Query error'
                });
            }
            return res.json({
                success: 1,
                message: 'Order updated successfully'
            });
        });
    },
    deleteOrder: (req, res) => {
        const id = req.params.id;
        deleteOrder(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Database query error'
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Query error'
                });
            }
            return res.json({
                success: 1,
                data: 'Order deleted successfully'
            });
        });
    }
}