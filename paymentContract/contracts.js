const { fantomWeb3, bscWeb3 } = require("../web3/initWeb3");
const ABI = require('./contractABI.json');
const { addressOnFTM, addressOnBSC } = require('./contractAddresses');
const FTMcontract = new fantomWeb3.eth.Contract(ABI, addressOnFTM);
const BSCcontract = new bscWeb3.eth.Contract(ABI, addressOnBSC);
module.exports = {
    FTMcontract,
    BSCcontract
};