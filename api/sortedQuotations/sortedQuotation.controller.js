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

const {
    createItem,
    getSortedItems,
    getSortedItemById,
    getSortedItemsByQuoteId,
    updateSortedItem,
    deleteSortedItem
} = require('../sortedItems/sortedItem.service');

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

            const prodCount = body.products.length;
            for(let i=0; i<prodCount; i++){
                const data = {
                    sortedquote_id: results.insertId,
                    product_link: body.products[i].product_link,
                    quantity: body.products[i].quantity,
                    item_weight: body.products[i].item_weight,
                    price: body.products[i].price
                };

                createItem(data, (itemErr, itemResult) => {
                    if(itemErr){
                        console.log(itemErr);
                        return res.json({
                            success: 0,
                            itemErr: 1,
                            message: "Item error"
                        });
                    }
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

            const prodCount = results.length;
            for(let i=0; i<prodCount; i++){
                getSortedItemsByQuoteId(results[i].id, (itemErr, itemResults) => {
                    if(itemErr){
                        console.log(itemErr);
                        return res.json({
                            success: 0,
                            itemErr: 1,
                            message: "Item error"
                        });
                    }
                    results[i].products = itemResults;
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