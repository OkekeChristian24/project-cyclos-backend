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


router.post('/', createSortedQuotation);
router.get('/', checkToken, getSortedQuotations);
router.get('/:id', checkToken, getSortedQuotationById);
router.get('/user/:id', checkToken, getSortedQuotationByUser);
router.get('/sorter/:id', checkToken, getSortedQuotationBySorter);
router.put('/:id', checkToken, updateSortedQuotation);
router.delete('/:id', checkToken, deleteSortedQuotation);

module.exports = router;