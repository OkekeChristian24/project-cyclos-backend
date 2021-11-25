const { body } = require('express-validator');


const validateRegister = [
    body("wallet", "No wallet found")
        .exists()
        .not().isEmpty()
        .isEthereumAddress()
        .withMessage("Invalid wallet address")
];

const validateEdit = [
    body("wallet", "No wallet found")
        .exists()
        .not().isEmpty()
        .isEthereumAddress()
        .withMessage("Invalid wallet address")
];

module.exports = {
    validateRegister,
    validateEdit
};
