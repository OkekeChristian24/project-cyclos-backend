const {fantomWeb3, bscWeb3} = require("./initWeb3");


const fantomHexToNumString = (hexValue) => {
    return fantomWeb3.utils.hexToNumberString(hexValue);
};

const bscHexToNumString = (hexValue) => {
    return bscWeb3.utils.hexToNumberString(hexValue)
};

module.exports = {
    fantomHexToNumString,
    bscHexToNumString
};