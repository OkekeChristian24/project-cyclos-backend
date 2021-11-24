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
router.get('/', getUnsortedQuotations);
router.get('/:id', getUnsortedQuotationById);
router.get('/user/:id', getUnsortedQuotationByUser);
router.get('/unsorter/:id', getUnsortedQuotationBySorter);
router.put('/:id', validateEdit, updateUnsortedQuotation);
router.delete('/:id', deleteUnsortedQuotation);

module.exports = router;