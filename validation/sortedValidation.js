const { body, check } = require('express-validator');

const validateCreate = [

    body("user_id", "No user id")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(Number.isInteger(value) && value > 0)){
                throw new Error('Invalid user id');
            }
            return true;
        }
    ),

    body("sorter_id", "No sorter id")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(Number.isInteger(value) && value > 0)){
                throw new Error('Invalid sorter id');
            }
            return true;
        }
    ),

    body("total_items", "No number of total items")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(Number.isInteger(value) && value > 0)){
                throw new Error('Invalid total item value');
            }
            return true;
        }
    ),

    body("total_amount", "No total amount")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(!isNaN(value)  && value > 0)){
                throw new Error('Invalid total amount')
            }
            return true;
        }
    ),

    body("products.*.product_link", "No product link")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .isURL().withMessage("Invalid Url"),

    body("products.*.quantity", "Specify product quantity")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(Number.isInteger(value) && value > 0)){
                throw new Error('Invalid product quantity');
            }
            return true;
        }
    ),

    body("products.*.item_weight", "No product weight")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(!isNaN(value)  && value > 0)){
                throw new Error('Invalid weight value')
            }
            return true;
        }
    ),

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


const validateEdit = [

    // body("user_id", "No user id")
    //     .exists({checkFalsy: true})
    //     .not().isEmpty()
    //     .custom((value, { req }) => {
    //         if(!(Number.isInteger(value) && value > 0)){
    //             throw new Error('Invalid user id');
    //         }
    //     }
    // ),

    // body("sorter_id", "No sorter id")
    //     .exists({checkFalsy: true})
    //     .not().isEmpty()
    //     .custom((value, { req }) => {
    //         if(!(Number.isInteger(value) && value > 0)){
    //             throw new Error('Invalid sorter id');
    //         }
    //     }
    // ),

    body("total_items", "No number of total items")
        .exists()
        .not().isEmpty({checkFalsy: true, checkNull: true})
        .custom((value, { req }) => {
            if(!(Number.isInteger(value) && value > 0)){
                throw new Error('Invalid total item value');
            }
            return true;

        }
    ),

    body("total_amount", "No total amount")
        .exists({checkFalsy: true, checkNull: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(!isNaN(value)  && value > 0)){
                throw new Error('Invalid total amount')
            }
            return true;

        }
    )

];


module.exports = {
    validateCreate,
    validateEdit
};