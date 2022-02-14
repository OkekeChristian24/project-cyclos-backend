const { body } = require('express-validator');
const {
    txHashRegex,
    validPhoneReg,
    validStreetReg,
    validCityReg,
    validStateReg,
    validCountryReg,
    validPostalCodeReg
 } = require("../regex/allRegex");
/*
* buyer (string)
* totalPrice (int)
* totalQty (int)
* paymentID (string)
* orderID (string)

* txnHash (string)

* tokenIndex (int)

* products[i].productLink (string)
* products[i].quantity (int)
* itemWeight (int)
* price (int)
* shipping: shippingDetails

*/

const validateCreate = [
    body("buyer", "No buyer specified")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .isEthereumAddress()
        .withMessage("Invalid buyer address")
    ,
    body("totalPrice", "No total amount")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(!isNaN(value)  && value > 0)){
                throw new Error('Invalid total amount')
            }
            return true;
            }
        )
    ,
    body("totalQty", "No total number of items")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom(
            (value, { req }) => {
                if(!(Number.isInteger(value) && value > 0)){
                    throw new Error('Invalid total item value');
                }
                return true;
            }
        )
    ,
    body("chainID", "No chain id")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom(
            (value, { req }) => {
                if(!(Number.isInteger(value) && value > 0)){
                    throw new Error('Invalid chain id');
                }
                return true;
            }
        )
    ,
    body("paymentID", "No payment id")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("orderID", "No order id")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("txnHash")
        .exists()
        .not().isEmpty()
        .trim()
        .escape()
        .custom(
            (value, { req }) => {
                const txHashRegex = /^0x([A-Fa-f0-9]{64})$/;
                if(txHashRegex.test(value)){
                    return true;
                }else{
                    throw new Error('Invalid transaction hash');
                }
         
            }
        )
    ,
    body("tokenIndex", "No token index")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom(
            (value, { req }) => {
                if(!(Number.isInteger(value) && value > 0)){
                    throw new Error('Invalid token index');
                }

                return true;
            }
        )
    ,
    body("products.*.link", "No product link")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .isURL().withMessage("Invalid product Url")
        .escape()
    ,
    body("products.*.quantity", "Specify product quantity")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom(
            (value, { req }) => {
                if(!(Number.isInteger(value) && value > 0)){
                    throw new Error('Invalid product quantity');
                }
                return true;
            }
        )
    ,
    body("products.*.asin", "No product asin")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("products.*.title", "No product title")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("products.*.image", "No product image")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .isURL().withMessage("Invalid image Url")
        .escape()
    ,
    body("products.*.price", "No product price")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom(
            (value, { req }) => {
            if(!(!isNaN(value)  && value > 0)){
                throw new Error('Invalid product price value');
            }
            return true;
            }
        )
    ,
    body("shipping.email", "Missing shipping email")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .isEmail().withMessage("Invalid shipping email")
        .normalizeEmail()
    ,
    body("shipping.phone", "Missing shipping phone")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .matches(validPhoneReg).withMessage("Invalid shipping phone")
        .escape()
    ,
    body("shipping.street", "Missing shipping street")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .matches(validStreetReg).withMessage("Invalid shipping street")
        .escape()
    ,
    body("shipping.city", "Missing shipping city")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .matches(validCityReg).withMessage("Invalid shipping street")
        .escape()
    ,
    body("shipping.state", "Missing shipping state")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .matches(validStateReg).withMessage("Invalid shipping street")
        .escape()
    ,
    body("shipping.country", "Missing shipping country")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .matches(validCountryReg).withMessage("Invalid shipping street")
        .escape()
    ,
    body("shipping.postalCode", "Missing shipping postal code")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .matches(validPostalCodeReg).withMessage("Invalid shipping street")
        .escape()
    
];

/**
 * 
const shippingDetails = {
    email: shippingAddress.email,
    phone: phoneNum,
    street: shippingAddress.street,
    city: shippingAddress.city,
    state: shippingAddress.state,
    country: shippingAddress.country,
    postalCode: shippingAddress.postalCode
};
body('productDetails.commodityID')


 * 
 */

const validateEdit = [
    body("buyer", "No buyer specified")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .isEthereumAddress()
        .withMessage("Invalid buyer address")
    ,
    body("totalPrice", "No total amount")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(!isNaN(value)  && value > 0)){
                throw new Error('Invalid total amount')
            }
            return true;
        }
    ),
    body("totalQty", "No total number of items")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom(
            (value, { req }) => {
                if(!(Number.isInteger(value) && value > 0)){
                    throw new Error('Invalid total item value');
                }
                return true;
            }
        )
    ,
    body("paymentID", "No payment id")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("orderID", "No order id")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("txnHash")
        .exists()
        .not().isEmpty()
        .trim()
        .escape()
        .custom(
            (value, { req }) => {
                if(txHashRegex.test(value)){
                    return true;
                }
                throw new Error('Invalid transaction hash');
            }
        )
    ,
    body("tokenIndex", "No token index")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom(
            (value, { req }) => {
                if(!(Number.isInteger(value) && value > 0)){
                    throw new Error('Invalid token index');
                }

                return true;
            }
        )
    ,
    body("products.*.link", "No product link")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .isURL().withMessage("Invalid Url")
    ,
    body("products.*.quantity", "Specify product quantity")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom(
            (value, { req }) => {
                if(!(Number.isInteger(value) && value > 0)){
                    throw new Error('Invalid product quantity');
                }
                return true;
            }
        )
    ,
    body("products.*.asin", "No product asin")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("products.*.title", "No product title")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("products.*.image", "No product image")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .isURL().withMessage("Invalid image Url")
        .escape()
    ,
    body("products.*.price", "No product price")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom(
            (value, { req }) => {
                if(!(!isNaN(value)  && value > 0)){
                    throw new Error('Invalid price value')
                }
                return true;
            }
        )
    ,
    body("shipping.email", "Missing shipping email")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .isEmail().withMessage("Invalid shipping email")
        .normalizeEmail()
    ,
    body("shipping.phone", "Missing shipping phone")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .matches(validPhoneReg).withMessage("Invalid shipping phone")
        .escape()
    ,
    body("shipping.street", "Missing shipping street")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .matches(validStreetReg).withMessage("Invalid shipping street")
        .escape()
    ,
    body("shipping.city", "Missing shipping city")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .matches(validCityReg).withMessage("Invalid shipping street")
        .escape()
    ,
    body("shipping.state", "Missing shipping state")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .matches(validStateReg).withMessage("Invalid shipping street")
        .escape()
    ,
    body("shipping.country", "Missing shipping country")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .matches(validCountryReg).withMessage("Invalid shipping street")
        .escape()
    ,
    body("shipping.postalCode", "Missing shipping postal code")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .matches(validPostalCodeReg).withMessage("Invalid shipping street")
        .escape()
      
];

const validateStatusChange = [
    body("status", "No status specified")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
        .custom((value, { req }) => {
            if(value !== "pending"  || value !== "fulfilled"){
                throw new Error('Invalid status value')
            }
            return true;
        })
    
];

module.exports = {
    validateCreate,
    validateEdit,
    validateStatusChange
};