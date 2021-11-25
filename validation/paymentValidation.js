const { body } = require('express-validator');

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

    body("network_id", "No network id")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(Number.isInteger(value) && value > 0)){
                throw new Error('Invalid network id');
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
        .escape()
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

    body("network_id", "No network id")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(Number.isInteger(value) && value > 0)){
                throw new Error('Invalid network id');
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
        .escape()
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