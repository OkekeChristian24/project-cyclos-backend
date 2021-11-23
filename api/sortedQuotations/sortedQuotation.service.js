const { pool } = require('../../config/database');

module.exports = {
    create: (data, callBack) => {},
    getSortedQuotations: callBack => {},
    getSortedQuotationById: (id, callBack) => {},
    getSortedQuotationByUser: (id, callBack) => {},
    getSortedQuotationBySorter: (id, callBack) => {},
    updateSortedQuotation: (id, data, callBack) => {},
    deleteSortedQuotation: (id, callBack) => {}
};

