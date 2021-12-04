const { validationResult } = require('express-validator');
const {
    create,
    getUnsortedQuotations,
    getUnsortedQuotationByUser,
    getUnsortedQuotationById,
    getUnsortedQuotationBySorter,
    updateUnsortedQuotation,
    deleteUnsortedQuotation
} = require('./unsortedQuotation.service');

const {
    createItem,
    getUnsortedItems,
    getUnsortedItemById,
    getUnsortedItemsByQuoteId,
    updateUnsortedItem,
    deleteUnsortedItem
} = require('../unsortedItems/unsortedItem.service');

module.exports = {
    createUnsortedQuotation: (req, res) => {
        console.log("Req body: ", req.body);
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


            // Here, insert the product links
            // into the unsortedquote_items table
            const prod_count = body.products.length;
            for(let i=0; i<prod_count; i++){
                // Here, call the create fxn in unsorted.controller file
                const data = {
                    unsortedquote_id: results.insertId,
                    product_link: body.products[i].product_link,
                    quantity: body.products[i].quantity
                };
                createItem(data, (itemErr, itemResult) => {
                    if(itemErr){
                        console.log(itemErr);
                        return res.json({
                            success: 0,
                            itemError: 1,
                            message: "Item error"
                        });
                    }
                });
            }
            return res.json({
                success: 1,
                message: 'Quote sent successfully'
            });
        });
    },
    getUnsortedQuotations: (req, res) => {
        getUnsortedQuotations((err, results) => {
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
    getUnsortedQuotationByUser: (req, res) => {
        const id = req.params.id;
        getUnsortedQuotationByUser(id, (err, results) => {
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
    getUnsortedQuotationById: (req, res) => {
        const id = req.params.id;
        getUnsortedQuotationById(id, (err, results) => {
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
    getUnsortedQuotationBySorter: (req, res) => {
        const id = req.params.id;
        getUnsortedQuotationBySorter(id, (err, results) => {
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
    updateUnsortedQuotation: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        updateUnsortedQuotation(id, body, (err, results) => {
            if(err){
                console.log(err);
                res.json({
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
    deleteUnsortedQuotation: (req, res) => {
        const id = req.params.id;
        deleteUnsortedQuotation(id, (err, results) => {
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