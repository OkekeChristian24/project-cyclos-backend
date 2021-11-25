const { body } = require('express-validator');

const validateCreate = [
    body("email", "No email found")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .isEmail().withMessage("Invalid email address"),

    body("first_name", "Enter first name")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape(),
    
    body("last_name", "Enter last name")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
];


const validateEdit = [
    
    body("first_name", "Enter first name")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    
    body("last_name", "Enter last name")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,

    body("status", "Specify your status")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
        .custom((value, { req }) => {
            return value == 'active';
        }
    ).withMessage("Invalid status")
];

module.exports = {
    validateCreate,
    validateEdit
};