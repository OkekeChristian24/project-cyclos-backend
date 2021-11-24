const { validateCreate, validateEdit } = require('../../validation/sortedValidation');

const {
    createSortedQuotation,
    getSortedQuotations,
    getSortedQuotationById,
    getSortedQuotationByUser,
    getSortedQuotationBySorter,
    updateSortedQuotation,
    deleteSortedQuotation
} = require('./sortedQuotation.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');


router.post('/', validateCreate, createSortedQuotation);
router.get('/', getSortedQuotations);
router.get('/:id', getSortedQuotationById);
router.get('/user/:id', getSortedQuotationByUser);
router.get('/sorter/:id', getSortedQuotationBySorter);
router.put('/:id', validateEdit, updateSortedQuotation);
router.delete('/:id', deleteSortedQuotation);

module.exports = router;