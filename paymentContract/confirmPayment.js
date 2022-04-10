const { FTMcontract, BSCcontract } = require("./contracts");
const convertedAmt = require("../web3/convertedAmt");
const { fantomHexToNumString, bscHexToNumString } = require("../web3/hexToNumString");
const checkTotalPrice = require("../utils/checkTotalPrice");


const confirmPaymentOnFantom = async(buyer, orderID, paymentID, totalPrice, chainID, tokenIndex, products, company) => {
    const txnPrice = convertedAmt(paymentDetails.totalPrice, fantomHexToNumString(chainID), tokenIndex)
    try {
        const paymentDetails = await FTMcontract.methods.getTransactionDetails(buyer, orderID).call();
        const isValidPrice = await checkTotalPrice(txnPrice, products, company);
        if(!isValidPrice){
            return {success: false, totalPriceToStore: txnPrice};
        };
        
        if(
            paymentID !== String(paymentDetails.paymentID)
        ){
            return {success: false, totalPriceToStore: txnPrice};
        }
        return {success: true, totalPriceToStore: txnPrice};
        
    } catch (error) {
        console.log(error);
        return {success: false, totalPriceToStore: txnPrice};
    }
};


const confirmPaymentOnBSC = async(buyer, orderID, paymentID, totalPrice, chainID, tokenIndex, products, company) => {
    const txnPrice = convertedAmt(paymentDetails.totalPrice, bscHexToNumString(chainID), tokenIndex);
    try {
        const paymentDetails = await BSCcontract.methods.getTransactionDetails(buyer, orderID).call();
        
        const isValidPrice = await checkTotalPrice(txnPrice, products, company);    
        if(!isValidPrice){
            return {success: false, totalPriceToStore: txnPrice};
        };
        
        if(
            paymentID !== String(paymentDetails.paymentID) 
        ){
            return {success: false, totalPriceToStore: txnPrice};
        }
        return {success: true, totalPriceToStore: txnPrice};
        
    } catch (error) {
        console.log(error);
        return {success: false, totalPriceToStore: txnPrice};
    }
};

module.exports = {
    confirmPaymentOnBSC,
    confirmPaymentOnFantom
};