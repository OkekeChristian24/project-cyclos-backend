const router = require('express').Router();
const { getFees, getFeesByCompany } = require("./fee.controller");

router.get('/', getFees);
router.get('/company/:company', getFeesByCompany);

module.exports = router;
