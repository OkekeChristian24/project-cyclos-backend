const { body } = require('express-validator');

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
    // body("products.*.itemWeight", "No product weight")
    //     .exists({checkFalsy: true})
    //     .not().isEmpty()
    //     .custom((value, { req }) => {
    //         if(!(!isNaN(value)  && value > 0)){
    //             throw new Error('Invalid weight value')
    //         }
    //         return true;
    //         }
    //     )
    // ,
    body("products.*.price", "No product price")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(!isNaN(value)  && value > 0)){
                throw new Error('Invalid price value');
            }
            return true;
            }
        )
    
];

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
                const txHashRegex = /^0x([A-Fa-f0-9]{64})$/;
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
    // body("products.*.itemWeight", "No product weight")
    //     .exists({checkFalsy: true})
    //     .not().isEmpty()
    //     .custom((value, { req }) => {
    //         if(!(!isNaN(value)  && value > 0)){
    //             throw new Error('Invalid weight value')
    //         }
    //         return true;
    //     }
    // ),
    body("products.*.price", "No product price")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(!isNaN(value)  && value > 0)){
                throw new Error('Invalid price value')
            }
            return true;
        }
    )    
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