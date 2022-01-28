const { FTMcontract, BSCcontract } = require("./contracts");
// const convertedAmt = require("../../web3/convertedAmt");
const convertedAmt = require("../web3/convertedAmt");
const { fantomHexToNumString, bscHexToNumString } = require("../web3/hexToNumString");


const confirmPaymentOnFantom = async(buyer, orderID, paymentID, totalPrice, chainID, tokenIndex) => {
    const paymentDetails = await FTMcontract.methods.getTransactionDetails(buyer, orderID).call();
    console.log("paymentDetails: ", paymentDetails);
    const txnPrice = convertedAmt(paymentDetails.totalPrice, chainID, tokenIndex)
    const convertedPaymentID = fantomHexToNumString(paymentID);
    console.log("convertedPaymentID: ", convertedPaymentID);
    // || 
    // buyer !== paymentDetails.buyer
        
    if(
        convertedPaymentID !== paymentDetails.paymentID 
        ||
        totalPrice > txnPrice
    ){
        return false;
    }
    return true;
};

// getTransactionDetails(address buyer, string memory orderId)
const confirmPaymentOnBSC = async(buyer, orderID, paymentID, totalPrice, chainID, tokenIndex) => {
    const paymentDetails = await BSCcontract.methods.getTransactionDetails(buyer, orderID).call();
    console.log("paymentDetails: ", paymentDetails);
    const txnPrice = convertedAmt(paymentDetails.totalPrice, chainID, tokenIndex)
    const convertedPaymentID = bscHexToNumString(paymentID);
    console.log("convertedPaymentID: ", convertedPaymentID);
    // || 
    // buyer !== paymentDetails.buyer
    if(
        convertedPaymentID !== paymentDetails.paymentID 
        ||
        totalPrice > txnPrice
    ){
        return false;
    }
    return true;
};

module.exports = {
    confirmPaymentOnBSC,
    confirmPaymentOnFantom
};