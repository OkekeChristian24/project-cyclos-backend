const async = require('async');
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
    deleteUnsortedItem,
    deleteUnsortedItemByQuoteId
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

            const insertId = results.insertId;
            async.each(body.products, (product, callBack) => {
                const data = {
                    unsortedquote_id: insertId,
                    product_link: product.product_link,
                    quantity: product.quantity
                };
                createItem(data, (itemErr, itemResult) => {
                    if(itemErr){
                        return callBack(itemErr);
                    }
                    return callBack(null);
                });
            }, (err) => {
                if(err){
                    console.log(err);
                    return res.json({
                        success: 0,
                        itemErr: 1,
                        message: "Item error"
                    });
                }
                return res.json({
                    success: 1,
                    message: "Quote sent successfully!"
                });
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

            getUnsortedItems((itemErr, itemResults) => {
                if(itemErr){
                    return res.json({
                        success: 0,
                        itemErr: 1,
                        message: 'Item query error'
                    });
                }

                const quoteResults = results;
                for(let i=0; i<results.length; i++){
                    const products = itemResults.filter(item => item.unsortedquote_id === results[i].id);
                    quoteResults[i].products = products;
                }
                res.json({
                    success: 1,
                    data: quoteResults
                });
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
            const quoteResults = results;
            async.eachOf(results, (result, index, callBack) => {
                getUnsortedItemsByQuoteId(result.id, (itemErr, itemResults) => {
                    if(itemErr){
                        return callBack(itemErr);
                    }
                    quoteResults[index].products = itemResults;
                    return callBack(null);
                });
                
            }, (err) => {
                if(err){
                    console.log(err);
                    return res.json({
                        success: 0,
                        itemErr: 1,
                        message: "Item query error"
                    });
                }
                return res.json({
                    success: 1,
                    data: quoteResults
                });
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

            const quoteResults = results;
            async.eachOf(results, (result, index, callBack) => {
                getUnsortedItemsByQuoteId(result.id, (itemErr, itemResults) => {
                    if(itemErr){
                        return callBack(itemErr);
                    }
                    quoteResults[index].products = itemResults;
                    return callBack(null);
                });
                
            }, (err) => {
                if(err){
                    console.log(err);
                    return res.json({
                        success: 0,
                        itemErr: 1,
                        message: "Item query error"
                    });
                }
                return res.json({
                    success: 1,
                    data: quoteResults
                });
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
            const quoteResults = results;
            async.eachOf(results, (result, index, callBack) => {
                getUnsortedItemsByQuoteId(result.id, (itemErr, itemResults) => {
                    if(itemErr){
                        return callBack(itemErr);
                    }
                    quoteResults[index].products = itemResults;
                    return callBack(null);
                });
                
            }, (err) => {
                if(err){
                    console.log(err);
                    return res.json({
                        success: 0,
                        itemErr: 1,
                        message: "Item query error"
                    });
                }
                return res.json({
                    success: 1,
                    data: quoteResults
                });
            });
        });
    },
    updateUnsortedQuotation: (req, res) => {
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

            const products = body.products;
            async.each(products, (product, callBack) => {
                const id = product.id;
                if(!id){
                    return callBack("Product id error");
                }

                const data = {
                    product_link: product.product_link,
                    quantity: product.quantity,
                };

                updateUnsortedItem(id, data, (itemErr, itemResult) => {
                    if(itemErr){
                        return callBack(itemErr);
                    }
                    return callBack();
                });
            }, (err) => {
                if(err){
                    console.log(err);
                    return res.json({
                        success: 0,
                        itemErr: 1,
                        message: "Item error"
                    });
                }
                return res.json({
                    success: 1,
                    message: "Quote updated successfully!"
                });
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

            deleteUnsortedItemByQuoteId(id, (err, itemResults) => {
                if(err){
                    console.log(err);
                    return res.json({
                        success: 0,
                        message: 'Item query error'
                    });
                }
                return res.json({
                    success: 1,
                    data: 'Quote deleted successfully'
                });
            });
        });

    },
};