const { pool } = require('../../config/database');

module.exports = {
    create: (data, callBack) => {},
    getUnsortedQuotations: callBack => {},
    getUnsortedQuotationById: (id, callBack) => {},
    getUnsortedQuotationByUser: (id, callBack) => {},
    getUnsortedQuotationBySorter: (id, callBack) => {},
    updateUnsortedQuotation: (id, data, callBack) => {},
    deleteUnsortedQuotation: (id, callBack) => {}
};
