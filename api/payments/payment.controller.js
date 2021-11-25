const { validationResult } = require('express-validator');
const {
    create,
    getPayments,
    getPaymentById,
    getPaymentByUser,
    updatePayment,
    deletePayment
} = require('./payment.service');

module.exports = {
    createPayment: (req, res) => {
        const errorsArr = [];
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            const errors = Object.values(validationErrors.mapped());
            errors.forEach(eachError => {
                errorsArr.push(eachError.msg);
            });
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
                return res.json({
                    success: 0,
                    message: 'Database query error'
                });
            }

            return res.json({
                success: 1,
                message: 'Payment made successfully!'
            });
        });
    },
    getPayments: (req, res) => {
        getPayments((err, results) => {
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
    getPaymentById: (req, res) => {
        const id = req.params.id;
        getPaymentById(id, (err, results) => {
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
    getPaymentByUser: (req, res) => {
        const id = req.params.id;
        getPaymentByUser(id, (err, results) => {
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
    updatePayment: (req, res) => {
        const errorsArr = [];
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            const errors = Object.values(validationErrors.mapped());
            errors.forEach(eachError => {
                errorsArr.push(eachError.msg);
            });
            return res.json({
                success: 0,
                isDataValid: 0,
                message: errorsArr
            });
        }

        const id = req.params.id;
        const body = req.body;
        updatePayment(id, body, (err, results) => {
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
                message: 'Payment updated successfully'
            });
        });
    },
    deletePayment: (req, res) => {
        const id = req.params.id;
        deletePayment(id, (err, results) => {
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
                data: 'Payment deleted successfully'
            });
        });
    }
};