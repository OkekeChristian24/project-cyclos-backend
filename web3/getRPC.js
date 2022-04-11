const chainRPCs = require("./chainRPCs");


const genRandomInt = (chainID) => {
    // min = Math.ceil(min);
    // max = Math.floor(max);
    const min = 0;
    const max = chainRPCs[chainID].length - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRPC = (chainID) => {
    return chainRPCs[chainID][genRandomInt(chainID)];
};

module.exports = getRPC;