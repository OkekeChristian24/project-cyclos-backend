const {
    getShippingAddressByOrderUniqueId
} = require('./shippingDetail.controller');

const router = require('express').Router();

router.post('/uid/:id', getShippingAddressByOrderUniqueId);

module.exports = router;