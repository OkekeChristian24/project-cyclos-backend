const async = require('async');
const {
    confirmPaymentOnBSC,
    confirmPaymentOnFantom
} = require("../../paymentContract/confirmPayment");
const notifyUserWithNodemailer = require("../../sendMail/withNodeMailer");
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

const {
    createShippingAddress,
    getShippingAddresses,
    getBuyerShippingAddress,
    getShippingAddressById,
    getShippingAddressByOrderId,
    getShippingAddressByOrderUniqueId,
    updateShippingAddress,
    deleteShippingAddress
} = require("../../otherServices/orderShippings.service");

const { createPayment } = require("../payments/payment.service");
const convertedAmt = require("../../web3/convertedAmt");
const checkTotalPrice = require('../../utils/checkTotalPrice');

/**
 * To place an order, we will have to confirm if payment for
 * the order was actually made on the blockchain
 */

module.exports = {
    createOrder: async(req, res) => {
        const errorsArr = [];
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            const errors = Object.values(validationErrors.mapped());
            errors.forEach(eachError => {
                errorsArr.push(eachError.msg);
            });
            // req.flash("errors", errorsArr);
            console.log(errorsArr);
            return res.status(400).json({
                success: 0,
                isDataValid: 0,
                message: errorsArr
            });
        }
        
        /**
         * Confirm if payment was made on the blockchain
         */
        // console.log("Request products: ", req.body.products);
        let confirmed;
        if(req.body.chainID === 56){
            confirmed = await confirmPaymentOnBSC(
                req.body.buyer,
                req.body.orderID,
                req.body.paymentID,
                req.body.totalPrice,
                req.body.chainID,
                req.body.tokenIndex,
                req.body.products,
                req.body.company
            );
            
            // console.log("txnDetails: ", txnDetails);
            if(!confirmed.success){
                console.log("Not confirmed error BSC");
                return res.status(404).json({
                    success: 0,
                    message: "Invalid transaction"
                });
            }
        }else if(req.body.chainID === 250){
            confirmed = await confirmPaymentOnFantom(
                req.body.buyer,
                req.body.orderID,
                req.body.paymentID,
                req.body.totalPrice,
                req.body.chainID,
                req.body.tokenIndex,
                req.body.products,
                req.body.company
            );

            if(!confirmed.success){
                console.log("Not confirmed error FTM");
                return res.status(404).json({
                    success: 0,
                    message: "Invalid transaction"
                });
            }
        }else{
            console.log("Invalid chain error");
            return res.status(404).json({
                success: 0,
                message: "Invalid chain ID"
            });
        }
        
        // const body = req.body;
        const orderBody = {
            buyer_addr: req.body.buyer,
            unique_id: req.body.orderID,
            total_amount: confirmed.totalPriceToStore,
            payment_unique_id: req.body.paymentID,
            total_items: req.body.totalQty
        };
        console.log("Body payment ID: ", req.body.paymentID);

        create(orderBody, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    success: 0,
                    message: 'Database query error'
                });
            }


            // Create payment
            
            const insertId = results.insertId;
            const shippingBody = {
                order_id: insertId,
                order_unique_id: req.body.orderID,
                buyer_addr: req.body.buyer,
                phone: req.body.shipping.phone,
                email: req.body.shipping.email,
                street: req.body.shipping.street,
                city: req.body.shipping.city,
                state: req.body.shipping.state,
                country: req.body.shipping.country,
                postal_code: req.body.shipping.postalCode,
            };
            createShippingAddress(shippingBody, (shippingErr, shippingRes) => {
                if (shippingErr) {
                    console.log(shippingErr);
                    return res.status(400).json({
                        success: 0,
                        message: 'Database query error'
                    });
                }

                if(!shippingRes){
                    console.log(shippingRes);
                    return res.status(502).json({
                        success: 0,
                        message: 'Invalid response'
                    });
                }
                
                const paymentBody = {
                    order_id: insertId,
                    order_unique_id: req.body.orderID,
                    buyer_addr: req.body.buyer,
                    amount: req.body.totalPrice,
                    unique_id: req.body.paymentID,
                    chain_id: req.body.chainID,
                    asset_id: req.body.tokenIndex,
                    tx_hash: req.body.txnHash
                };
                createPayment(paymentBody, (err, payResults) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({
                            success: 0,
                            message: 'Database query error'
                        });
                    }
        
                    if(!payResults){
                        console.log(payResults);
                        return res.status(502).json({
                            success: 0,
                            message: 'Invalid response'
                        });
                    }
    
                    const products = req.body.products;
                    async.each(products, (product, callBack) => {
                                            
                        const data = {
                            order_id: insertId,
                            product_link: product.link,
                            asin: product.asin,
                            image: product.image,
                            color: product.color,
                            size: product.size,
                            title: product.title,
                            quantity: product.quantity,
                            price: product.price
                        };
                        createItem(data, (itemErr, itemResult) => {
                            if(itemErr){
                                console.log(itemErr);
                                return callBack(itemErr);
                            }
                            return callBack(null);
                        });
                    }, (err) => {
                        if(err){
                            console.log(err);
                            return res.status(400).json({
                                success: 0,
                                itemErr: 1,
                                message: "Item error"
                            });
                        }
                        
                        const mailResult = notifyUserWithNodemailer(
                            req.body.shipping.email,
                            "Cyclos Order Confirmation",
                            `You placed an order with ID ${req.body.orderID}`
                        );

                        return res.status(200).json({
                            success: 1,
                            message: mailResult ? "Order placed successfully. Check your email!" : "Order placed successfully"
                        });
                    });
    
                });

            });



        });
    },
    getOrders: (req, res) => {
        getOrders((err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    success: 0,
                    message: 'Database query error'
                });
            }
            if (!results) {
                return res.status(502).json({
                    success: 0,
                    message: 'Query error'
                });
            }

            // const count = results.length;

            getOrderItems((err, itemResults) => {
                if(err){
                    return res.status(400).json({
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

                res.status(200).json({
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
                return res.status(400).json({
                    success: 0,
                    message: 'Database query error'
                });
            }
            if (!results) {
                return res.status(502).json({
                    success: 0,
                    message: 'Query error'
                });
            }

            /*
            Shops endpoints are on hold for now
            */

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUserOrders: (req, res) => {
        const addr = req.params.address;
        getUserOrders(addr, (err, results) => {
            if(err){
                console.log(err);
                return res.status(400).json({
                    success: 0,
                    message: 'Database query error'
                });
            }
            if(!results){
                return res.status(502).json({
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
                    return res.status(400).json({
                        success: 0,
                        itemError: 1,
                        message: "Item error"
                    });
                }
                return res.status(200).json({
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
                return res.status(400).json({
                    success: 0,
                    message: 'Database query error'
                });
            }
            if (!results) {
                return res.status(502).json({
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
                    return res.status(400).json({
                        success: 0,
                        itemErr: 1,
                        message: "Item error"
                    });
                }
                return res.status(200).json({
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
            return res.status(400).json({
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
                return res.status(400).json({
                    success: 0,
                    message: 'Oops something went wrong'
                });
            }
            if (!results) {
                return res.status(502).json({
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
                    return res.status(400).json({
                        success: 0,
                        itemErr: 1,
                        message: "Item error"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Order updated successfully!"
                });
            });
            
        });
    },
    updateOrderStatus: (req, res) => {
        const errorsArr = [];
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            const errors = Object.values(validationErrors.mapped());
            errors.forEach(eachError => {
                errorsArr.push(eachError.msg);
            });
            return res.status(400).json({
                success: 0,
                isDataValid: 0,
                message: errorsArr
            });
        }
        
        req.params.id
    },
    deleteOrder: (req, res) => {
        const id = req.params.id;
        deleteOrder(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    success: 0,
                    message: 'Database query error'
                });
            }
            if (!results) {
                return res.status(502).json({
                    success: 0,
                    message: 'Query error'
                });
            }

            deleteOrderItemByOrderId(id, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(400).json({
                        success: 0,
                        message: 'Item query error'
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: 'Order deleted successfully'
                });
            });


        });
    }
}