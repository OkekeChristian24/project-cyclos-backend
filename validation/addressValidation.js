const { body } = require('express-validator');


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
    body("address_line1", "Enter your address")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("address_line2")
        .trim()
        .escape()
    ,
    body("city", "Enter your city")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("postal_code", "Postal code is needed")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("country", "Enter your country")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("phone", "Enter your phone")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
];

const validateEdit = [
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
    body("address_line1", "Enter your address")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("address_line2")
        .trim()
        .escape()
    ,
    body("city", "Enter your city")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("postal_code", "Postal code is needed")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("country", "Enter your country")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("phone", "Enter your phone")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
];

module.exports = {
    validateCreate,
    validateEdit
};