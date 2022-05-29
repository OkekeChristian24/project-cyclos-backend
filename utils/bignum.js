const BigNumber = require('bignumber.js');

BigNumber.config({
    EXPONENTIAL_AT: 1e+9,
    DECIMAL_PLACES: 80,
});

const PRECISION_FACTOR = 10000;
const BIG_ZERO = new BigNumber(0);
const BIG_ONE = new BigNumber(1);
const BIG_NINE = new BigNumber(9);
const BIG_TEN = new BigNumber(10);

module.exports = {
    PRECISION_FACTOR,
    BIG_ZERO,
    BIG_ONE,
    BIG_NINE,
    BIG_TEN
}
