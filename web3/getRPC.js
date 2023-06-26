const chainRPCs = require("./chainRPCs");

const genRandomInt = (chainID) => {
  const min = 0;
  const max = chainRPCs[chainID].length - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRPC = (chainID) => {
  return chainRPCs[chainID][genRandomInt(chainID)];
};

module.exports = getRPC;
