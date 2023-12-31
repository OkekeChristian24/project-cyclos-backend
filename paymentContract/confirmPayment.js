const { FTMcontract, BSCcontract, Polygoncontract } = require("./contracts");
const convertedAmt = require("../web3/convertedAmt");
const { fantomHexToNumString, bscHexToNumString } = require("../web3/hexToNumString");
const checkTotalPrice = require("../utils/checkTotalPrice");


const confirmPaymentOnFantom = async(buyer, orderID, paymentID, totalPrice, chainID, tokenIndex, products, company) => {
    let txnPrice;
    try {
        const paymentDetails = await FTMcontract.methods.getTransactionDetails(buyer, orderID).call();
        txnPrice = convertedAmt(paymentDetails.totalPrice, fantomHexToNumString(chainID), tokenIndex)
        
        const isValidPrice = await checkTotalPrice(txnPrice, products, company);
        if(!isValidPrice){
            console.log('Total price not valid');
            return {success: false, totalPriceToStore: txnPrice};
        };
        
        if(
            paymentID !== String(paymentDetails.paymentID)
        ){
            console.log('Payment ID not valid');
            return {success: false, totalPriceToStore: txnPrice};
        }
        return {success: true, totalPriceToStore: txnPrice};
        
    } catch (error) {
        console.log(error);
        return {success: false, totalPriceToStore: txnPrice};
    }
};


const confirmPaymentOnBSC = async(buyer, orderID, paymentID, totalPrice, chainID, tokenIndex, products, company) => {
    let txnPrice;
    try {
        const paymentDetails = await BSCcontract.methods.getTransactionDetails(buyer, orderID).call();
        txnPrice = convertedAmt(paymentDetails.totalPrice, bscHexToNumString(chainID), tokenIndex);
        // console.log('totalPrice: ', totalPrice);
        // console.log('txnPrice: ', txnPrice);
        // console.log('paymentID: ', paymentID);
        // console.log('paymentDetails.paymentID: ', paymentDetails.paymentID);
        const isValidPrice = await checkTotalPrice(txnPrice, products, company);    
        if(!isValidPrice){
            console.log('Total price not valid');
            return {success: false, totalPriceToStore: txnPrice};
        };
        
        if(
            paymentID !== String(paymentDetails.paymentID)
        ){
            console.log('Payment ID not valid');
            return {success: false, totalPriceToStore: txnPrice};
        }
        return {success: true, totalPriceToStore: txnPrice};
        
    } catch (error) {
        console.log('confirmPaymentOnBSC error: ', error);
        return {success: false, totalPriceToStore: txnPrice};
    }
};

const confirmPaymentOnPolygon = async(buyer, orderID, paymentID, totalPrice, chainID, tokenIndex, products, company) => {
    let txnPrice;
    try {
        const paymentDetails = await Polygoncontract.methods.getTransactionDetails(buyer, orderID).call();
        txnPrice = convertedAmt(paymentDetails.totalPrice, bscHexToNumString(chainID), tokenIndex);
        
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
    confirmPaymentOnFantom,
    confirmPaymentOnPolygon
};