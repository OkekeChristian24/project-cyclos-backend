const BigNumber = require('bignumber.js');

BigNumber.config({
    EXPONENTIAL_AT: 1e+9,
    DECIMAL_PLACES: 80,
});

const calculate = (chargePercent, taxPercent, price) => {
    const chargePercentBN = new BigNumber(chargePercent);
    const taxPercentBN = new BigNumber(taxPercent);
    const priceBN = new BigNumber(price);
    const percentage = new BigNumber(100)
    

    const feesBN = chargePercentBN.plus(taxPercentBN).dividedBy(percentage) ;
    const feesChargedBN = feesBN.times(priceBN);


    // const fees = (Number(chargePercent) + Number(taxPercent)) / 100;
    // const feesCharged = fees * Number(price);
    
    // return Number(feesCharged) + Number(price);
    return (feesChargedBN.plus(priceBN)).toFixed(15);

};

module.exports = calculate