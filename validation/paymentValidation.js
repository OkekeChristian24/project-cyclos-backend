const { body } = require('express-validator');

/**
 *
 data.order_id,
data.order_unique_id,
data.buyer_addr,
data.amount,
data.unique_id,
data.chain_id,
data.asset_id,
data.tx_hash
 *
 */

const validateCreate = [
    body("order_id", "No order id")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(Number.isInteger(value) && value > 0)){
                throw new Error('Invalid order id');
            }

            return true;
        }
    ),

    body("totalPrice", "No amount value")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(!isNaN(value)  && value > 0)){
                throw new Error('Invalid amount value')
            }
            return true;
        }
    ),

    body("chain_id", "No chain id")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(Number.isInteger(value) && value > 0)){
                throw new Error('Invalid chain id');
            }

            return true;
        }
    ),

    body("asset_id", "No asset id")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(Number.isInteger(value) && value > 0)){
                throw new Error('Invalid asset id');
            }

            return true;
        }
    ),

    body("tx_hash")
        .exists()
        .not().isEmpty()
        .trim()
        .custom((value, { req }) => {
            const txHashRegex = /^0x([A-Fa-f0-9]{64})$/;
            if(txHashRegex.test(value)){
                return true;
            }else{
                throw new Error('Invalid transaction hash');
            }
         
        }
    )

];

const validateEdit = [
    body("order_id", "No order id")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(Number.isInteger(value) && value > 0)){
                throw new Error('Invalid order id');
            }

            return true;
        }
    ),

    body("amount", "No amount value")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(!isNaN(value)  && value > 0)){
                throw new Error('Invalid amount value')
            }
            return true;
        }
    ),

    body("chain_id", "No chain id")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(Number.isInteger(value) && value > 0)){
                throw new Error('Invalid chain id');
            }

            return true;
        }
    ),

    body("asset_id", "No asset id")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(Number.isInteger(value) && value > 0)){
                throw new Error('Invalid asset id');
            }

            return true;
        }
    ),

    body("tx_hash")
        .exists()
        .not().isEmpty()
        .trim()
        .custom((value, { req }) => {
            const txHashRegex = /^0x([A-Fa-f0-9]{64})$/;
            if(txHashRegex.test(value)){
                return true;
            }else{
                throw new Error('Invalid transaction hash');
            }
         
        }
    )

];


module.exports = {
    validateCreate,
    validateEdit
};