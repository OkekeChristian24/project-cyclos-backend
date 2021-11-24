const { validationResult } = require('express-validator');
const {
    create,
    getSortedQuotations,
    getSortedQuotationByUser,
    getSortedQuotationById,
    getSortedQuotationBySorter,
    updateSortedQuotation,
    deleteSortedQuotation
} = require('./sortedQuotation.service');

module.exports = {
    createSortedQuotation: (req, res) => {
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
            if(err){
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Database query error'
                });
            }

            return res.json({
                success: 1,
                message: 'Quote placed successfully!'
            });
        });
    },
    getSortedQuotations: (req, res) => {
        getSortedQuotations((err, results) => {
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
    getSortedQuotationByUser: (req, res) => {
        const id = req.params.id;
        getSortedQuotationByUser(id, (err, results) => {
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
    getSortedQuotationById: (req, res) => {
        const id = req.params.id;
        getSortedQuotationById(id, (err, results) => {
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
    getSortedQuotationBySorter: (req, res) => {
        const id = req.params.id;
        getSortedQuotationBySorter(id, (err, results) => {
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
    updateSortedQuotation: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        updateSortedQuotation(id, body, (err, results) => {
            if(err){
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Oops something went wrong'
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
                message: 'Quote updated successfully'
            });
        });
    },
    deleteSortedQuotation: (req, res) => {
        const id = req.params.id;
        deleteSortedQuotation(id, (err, results) => {
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
                message: 'Quote deleted successfully'
            })
        });
    },
};