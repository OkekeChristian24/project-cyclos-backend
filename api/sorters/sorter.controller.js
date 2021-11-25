const { validationResult } = require('express-validator');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const {
    create,
    getSorters,
    getSorterById,
    getSorterByEmail,
    updateSorter,
    deleteSorter
} = require('./sorter.service');

module.exports = {
    createSorter: (req, res) => {
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
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

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
                message: 'Sorter created successfully!'
            });
        });
    },
    getSorters: (req, res) => {
        getSorters((err, results) => {
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
    getSorterById: (req, res) => {
        const id = req.params.id;
        getSorterById(id, (err, results) => {
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
    getSorterByEmail: (req, res) => {
        const email = req.params.email;
        getSorterByEmail(email, (err, results) => {
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
    updateSorter: (req, res) => {
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
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        updateSorter(id, body, (err, results) => {
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
                message: 'Sorter updated successfully'
            });
        });
    },
    deleteSorter: (req, res) => {
        const id = req.params.id;
        deleteSorter(id, (err, results) => {
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
                data: 'Sorter deleted successfully'
            });
        });
    },
};