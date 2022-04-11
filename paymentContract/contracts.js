const { fantomWeb3, bscWeb3, polygonWeb3 } = require("../web3/initWeb3");
const ABI = require('./contractABI');
const { addressOnFTM, addressOnBSC, addressOnPolygon } = require('./contractAddresses');
const FTMcontract = new fantomWeb3.eth.Contract(ABI, addressOnFTM);
const BSCcontract = new bscWeb3.eth.Contract(ABI, addressOnBSC);
const Polygoncontract = new polygonWeb3.eth.Contract(ABI, addressOnPolygon);
module.exports = {
    FTMcontract,
    BSCcontract,
    Polygoncontract
};