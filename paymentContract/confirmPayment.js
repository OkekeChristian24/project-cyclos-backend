const { FTMcontract, BSCcontract } = require("./contracts");
const convertedAmt = require("../web3/convertedAmt");
const { fantomHexToNumString, bscHexToNumString } = require("../web3/hexToNumString");
const checkTotalPrice = require("../utils/checkTotalPrice");


const confirmPaymentOnFantom = async(buyer, orderID, paymentID, totalPrice, chainID, tokenIndex, products, company) => {
    try {
        const paymentDetails = await FTMcontract.methods.getTransactionDetails(buyer, orderID).call();
        const txnPrice = convertedAmt(paymentDetails.totalPrice, fantomHexToNumString(chainID), tokenIndex)
        const isValidPrice = await checkTotalPrice(txnPrice, products, company);
        if(!isValidPrice){
            return false;
        };
        
        if(
            paymentID !== String(paymentDetails.paymentID)
        ){
            return false;
        }
        return true;
        
    } catch (error) {
        console.log(error);
        return false;
    }
};


const confirmPaymentOnBSC = async(buyer, orderID, paymentID, totalPrice, chainID, tokenIndex, products, company) => {
    try {
        const paymentDetails = await BSCcontract.methods.getTransactionDetails(buyer, orderID).call();
        const txnPrice = convertedAmt(paymentDetails.totalPrice, bscHexToNumString(chainID), tokenIndex)
        const isValidPrice = await checkTotalPrice(txnPrice, products, company);    
        if(!isValidPrice){
            return false
        };
        
        if(
            paymentID !== String(paymentDetails.paymentID) 
        ){
            return false;
        }
        return true;
        
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = {
    confirmPaymentOnBSC,
    confirmPaymentOnFantom
};