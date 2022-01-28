const Web3 = require('web3');

const bscRPc = process.env.BSC_RPCURL;
const fantomRPC = process.env.FANTOM_RPCURL;

const fantomWeb3 = new Web3(fantomRPC);
const bscWeb3 = new Web3(bscRPc);

module.exports = {
    fantomWeb3,
    bscWeb3
};