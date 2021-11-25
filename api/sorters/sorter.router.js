const { validateCreate, validateEdit } = require('../../validation/sorterValidation');

const {
    createSorter,
    getSorters,
    getSorterById,
    getSorterByEmail,
    updateSorter,
    deleteSorter
} = require('./sorter.controller');

const router = require('express').Router();

router.post('/', validateCreate, createSorter);
router.get('/', getSorters);
router.get('/:id', getSorterById);
router.get('/email/:email', getSorterByEmail);
router.put('/:id', validateEdit, updateSorter);
router.delete('/:id', deleteSorter);


module.exports = router;