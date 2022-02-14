const { FTMcontract, BSCcontract } = require("./contracts");
// const convertedAmt = require("../../web3/convertedAmt");
const convertedAmt = require("../web3/convertedAmt");
const { fantomHexToNumString, bscHexToNumString } = require("../web3/hexToNumString");


const confirmPaymentOnFantom = async(buyer, orderID, paymentID, totalPrice, chainID, tokenIndex) => {
    const paymentDetails = await FTMcontract.methods.getTransactionDetails(buyer, orderID).call();
    console.log("paymentDetails: ", paymentDetails);

    const txnPrice = convertedAmt(paymentDetails.totalPrice, chainID, tokenIndex)
    console.log("Payment ID compare: ", paymentID !== String(paymentDetails.paymentID));
    console.log("Buyer compare: ", buyer !== paymentDetails.buyer);
    console.log("Price compare: ", totalPrice > txnPrice);
    
    console.log("Frontend paymentID: ", paymentID);
    console.log("Backend paymentID: ", String(paymentDetails.paymentID));
    console.log("Frotend buyer: ", buyer);
    console.log("Backend buyer: ", paymentDetails.buyer);
    console.log("Frontend price: ", totalPrice);
    console.log("Backend price: ", txnPrice);
    
    console.log("typeof Frontend paymentID: ", typeof paymentID);
    console.log("typeof Backend paymentID: ", typeof String(paymentDetails.paymentID));
    console.log("typeof Frotend buyer: ", typeof buyer);
    console.log("typeof Backend buyer: ", typeof paymentDetails.buyer);
    console.log("typeof Frontend price: ", typeof totalPrice);
    console.log("typeof Backend price: ", typeof txnPrice);
    

    if(
        paymentID !== String(paymentDetails.paymentID)
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
    
    if(
        paymentID !== String(paymentDetails.paymentID) 
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