const { validateCreate, validateEdit } = require('../../validation/unsortedValidation');
const {
    createUnsortedQuotation,
    getUnsortedQuotations,
    getUnsortedQuotationById,
    getUnsortedQuotationByUser,
    getUnsortedQuotationBySorter,
    updateUnsortedQuotation,
    deleteUnsortedQuotation
} = require('./unsortedQuotation.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');


router.post('/', validateCreate, createUnsortedQuotation);
router.get('/', checkToken, getUnsortedQuotations);
router.get('/:id', checkToken, getUnsortedQuotationById);
router.get('/user/:id', checkToken, getUnsortedQuotationByUser);
router.get('/sorter/:id', checkToken, getUnsortedQuotationBySorter);
router.put('/:id', checkToken, validateEdit, updateUnsortedQuotation);
router.delete('/:id', checkToken, deleteUnsortedQuotation);

module.exports = router;