const {fantomWeb3, bscWeb3} = require("./initWeb3");


const fantomHexToNumString = (hexValue) => {
    return fantomWeb3.utils.isHex(hexValue) ? fantomWeb3.utils.hexToNumberString(hexValue) : hexValue;
};

const bscHexToNumString = (hexValue) => {
    return bscWeb3.utils.isHex(hexValue) ? bscWeb3.utils.hexToNumberString(hexValue) : hexValue;
};

module.exports = {
    fantomHexToNumString,
    bscHexToNumString
};