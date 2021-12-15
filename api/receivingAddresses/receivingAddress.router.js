const { validateCreate, validateEdit } = require('../../validation/addressValidation');

const {
    createAddress,
    getAddresses,
    getUserAddress,
    getAddressById,
    updateAddress,
    deleteAddress
} = require('./receivingAddress.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post('/', validateCreate, createAddress);
router.get('/', getAddresses);
router.get('/:id', getAddressById);
router.get('/user/:id', getUserAddress);
router.put('/:id', validateEdit, updateAddress);
router.delete('/:id', deleteAddress);