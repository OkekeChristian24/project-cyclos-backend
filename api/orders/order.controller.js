const async = require('async');
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

const {
    createItem,
    getOrderItems,
    getOrderItemById,
    getItemsByOrderId,
    updateOrderItem,
    deleteOrderItem,
    deleteOrderItemByOrderId
} = require('../orderItems/orderItem.service');

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
                return res.json({
                    success: 0,
                    message: 'Database query error'
                });
            }

            const products = body.products;
            const insertId = results.insertId;

            async.each(products, (product, callBack) => {
                console.log(product);
                const data = {
                    order_id: insertId,
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
                    message: "Order placed successfully!"
                });
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

            const count = results.length;

            getOrderItems((err, itemResults) => {
                if(err){
                    return res.json({
                        success: 0,
                        itemErr: 1,
                        message: 'Item query error'
                    });
                }

                const orderResults = results;

                for(let i=0; i<results.length; i++){
                    
                    const products = itemResults.filter(item => item.order_id === results[i].id);
                    orderResults[i].products = products;
                }

                res.json({
                    success: 1,
                    data: orderResults
                });       

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
                    message: 'Query error'
                });
            }

            /*
            Shops endpoints are on hold for now
            */

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

            const dupResults = results;
            async.eachOf(results, (result, index, callBack) => {
                getItemsByOrderId(result.id, (itemErr, itemResult) => {
                    if(itemErr){
                        return callBack(itemErr);
                    }
                    dupResults[index].products = itemResult;
                    return callBack(null);
                });
            }, (err) => {
                if(err){
                    console.log(err);
                    return res.json({
                        success: 0,
                        itemError: 1,
                        message: "Item error"
                    });
                }
                return res.json({
                    success: 1,
                    data: dupResults
                });
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
            
            const dupResults = results;
            async.eachOf(results, (result, index, callBack) => {
                getItemsByOrderId(result.id, (itemErr, itemResult) => {
                    if(itemErr){
                        return callBack(itemErr);
                    }
                    dupResults[index].products = itemResult;
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
                    data: dupResults
                });
            });
            
        });
    },
    updateOrder: (req, res) => {
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

            const products = body.products;

            async.each(products, (product, callBack) => {
                console.log(product);
                const id = product.id;
                console.log(id);
                if(!id){
                    return callBack("Product id error");
                }
                const data = {
                    product_link: product.product_link,
                    quantity: product.quantity,
                    item_weight: product.item_weight,
                    price: product.price
                };

                updateOrderItem(id, data, (itemErr, itemResult) => {
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
                    message: "Order updated successfully!"
                });
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

            deleteOrderItemByOrderId(id, (err, results) => {
                if(err){
                    console.log(err);
                    return res.json({
                        success: 0,
                        message: 'Item query error'
                    });
                }
                return res.json({
                    success: 1,
                    data: 'Order deleted successfully'
                });
            });


        });
    }
}