const async = require('async');
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
    deleteSortedItem,
    deleteSortedItemByQuoteId
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

            const insertId = results.insertId;
            async.each(body.products, (product, callBack) => {
                const data = {
                    sortedquote_id: insertId,
                    product_link: product.product_link,
                    quantity: product.quantity,
                    item_weight: product.item_weight,
                    price: product.price
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
                    message: "Quote placed successfully!"
                });
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

            
            getSortedItems((itemErr, itemResults) => {
                if(itemErr){
                    return res.json({
                        success: 0,
                        itemErr: 1,
                        message: 'Item query error'
                    });
                }

                const quoteResults = results;
                for(let i=0; i<results.length; i++){
                    const products = itemResults.filter(item => item.sortedquote_id === results[i].id);
                    quoteResults[i].products = products;
                }

                res.json({
                    success: 1,
                    data: quoteResults
                });

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

            const quoteResults = results;
            async.eachOf(results, (result, index, callBack) => {
                getSortedItemsByQuoteId(result.id, (itemErr, itemResults) => {
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

            const quoteResults = results;
            async.eachOf(results, (result, index, callBack) => {
                getSortedItemsByQuoteId(result.id, (itemErr, itemResults) => {
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

            const quoteResults = results;
            async.eachOf(results, (result, index, callBack) => {
                getSortedItemsByQuoteId(result.id, (itemErr, itemResults) => {
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
    updateSortedQuotation: (req, res) => {
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

            const products = body.products;
            async.each(products, (product, callBack) => {
                const id = product.id;
                if(!id){
                    return callBack("Product id error");
                }

                const data = {
                    product_link: product.product_link,
                    quantity: product.quantity,
                    item_weight: product.item_weight,
                    price: product.price
                };

                updateSortedItem(id, data, (itemErr, itemResult) => {
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

            deleteSortedItemByQuoteId(id, (err, itemResults) => {
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