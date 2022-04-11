const Web3 = require('web3');
const getRPC = require('./getRPC');

const bscRPc = process.env.BSC_RPCURL;
const fantomRPC = process.env.FANTOM_RPCURL;
const polygonRPC = process.env.POLYGON_RPCURL;

const fantomWeb3 = new Web3(getRPC(250));
const bscWeb3 = new Web3(getRPC(56));
const polygonWeb3 = new Web3(getRPC(137));

module.exports = {
    fantomWeb3,
    bscWeb3,
    polygonWeb3
};