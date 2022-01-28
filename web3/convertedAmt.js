const BigNumber = require('bignumber.js');
const supportedTokens = require("../paymentContract/supportedTokens");

const convertedAmt = (value, chainID, tokenIndex) => {
    
    // console.log("In convertedAmt, chainID: ", chainID);
    // console.log("In convertedAmt, tokenIndex: ", tokenIndex);
    // console.log("In convertedAmt, supported: ", supportedTokens[chainID][tokenIndex - 1]);

    
    console.log("In convertedAmt, supported: ", supportedTokens[chainID][tokenIndex - 1].decimals);
    const decimals = supportedTokens[chainID][tokenIndex - 1].decimals;
    // const amt = new BigNumber(value / 10 ** decimals);
    // const amt = new BigNumber(value / 10 ** decimals);
    const amt = Number((parseFloat(value)/10**decimals).toFixed(5))

    console.log("Converted amount: ", amt);
    return amt;
};

module.exports = convertedAmt;