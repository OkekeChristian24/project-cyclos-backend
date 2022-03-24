
const calculate = (chargePercent, taxPercent, price) => {
    const fees = (Number(chargePercent) + Number(taxPercent)) / 100;
    const feesCharged = fees * Number(price);
    console.log("calculated: ", Number(feesCharged) + Number(price));
    return Number(feesCharged) + Number(price);
};

module.exports = calculate