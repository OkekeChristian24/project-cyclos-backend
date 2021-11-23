const { body } = require('express-validator');


const validateCreate = [
    
    body("user_id", "No user id")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(Number.isInteger(value) && value > 0)){
                throw new Error('Invalid user id');
            }
        }
    ),

    body("sorter_id", "No sorter id")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(Number.isInteger(value) && value > 0)){
                throw new Error('Invalid sorter id');
            }
        }
    ),

    body("total_items", "No number of total items")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(Number.isInteger(value) && value > 0)){
                throw new Error('Invalid total item value');
            }
        }
    )

];



const validateEdit = [
    
    body("user_id", "No user id")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(Number.isInteger(value) && value > 0)){
                throw new Error('Invalid user id');
            }
        }
    ),

    body("sorter_id", "No sorter id")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(Number.isInteger(value) && value > 0)){
                throw new Error('Invalid sorter id');
            }
        }
    ),

    body("total_items", "No number of total items")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(Number.isInteger(value) && value > 0)){
                throw new Error('Invalid total item value');
            }
        }
    )

];


module.exports = {
    validateCreate,
    validateEdit
};