//const chainID = 250;
// const tokenAddress = supportedTokens[chainID][tokenIndex].address;
// Fantom => USDT: 0x049d68029688eabf473097a2fc38ef61633a3c7a
// BSC => USDT: 0x55d398326f99059ff775485246999027b3197955, BUSD: 0xe9e7cea3dedca5984780bafc599bd69add087d56

// Created TestUSD on Fantom net = 0x7d0dFC3A87243B11B831721fC5285b698D9c9ee4

// 0xfa represents 250(decimal) in hexdecimal
// 0x38 represents 56(decimal) in hexdecimal
const fantomHex = "0xfa";
const bscHex = "0x38";


const supportedTokens = {
    250: [
        {
            index: 1,
            name: "USDT",
            image: "",
            address: "0x7d0dFC3A87243B11B831721fC5285b698D9c9ee4",
            decimals: 18
        }
    ],
    [fantomHex]: [
        {
            index: 1,
            name: "USDT",
            image: "",
            address: "0x049d68029688eabf473097a2fc38ef61633a3c7a",
            decimals: 18
        }
    ],
    56: [
        {
            index: 1,
            name: "USDT",
            image: "",
            address: "0x55d398326f99059ff775485246999027b3197955",
            decimals: 18
        },
        {
            index: 2,
            name: "BUSD",
            image: "",
            address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
            decimals: 18
        }
    ],
    [bscHex]: [
        {
            index: 1,
            name: "USDT",
            image: "",
            address: "0x55d398326f99059ff775485246999027b3197955",
            decimals: 18
        },
        {
            index: 2,
            name: "BUSD",
            image: "",
            address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
            decimals: 18
        }
    ]
};

module.exports = supportedTokens;

// export const paymentAddresses = {
//     250: "0xf7FD0dBA3410A28cB3de622d37Ee066C5cBACc6B",
//     56: "not-yet-deployed"
// };