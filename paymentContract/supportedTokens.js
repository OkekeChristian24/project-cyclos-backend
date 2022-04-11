//const chainID = 250;
// const tokenAddress = supportedTokens[chainID][tokenIndex].address;
// Fantom => USDT: 0x049d68029688eabf473097a2fc38ef61633a3c7a
// BSC => USDT: 0x55d398326f99059ff775485246999027b3197955, BUSD: 0xe9e7cea3dedca5984780bafc599bd69add087d56

// Created TestUSD on Fantom net = 0x7d0dFC3A87243B11B831721fC5285b698D9c9ee4

// 0xfa represents 250(decimal) in hexdecimal
// 0x38 represents 56(decimal) in hexdecimal
const fantomHex = "0xfa";
const bscHex = "0x38";
const polygonHex = "0x89";


const supportedTokens = {
    // 250: [
    //     {
    //         index: 1,
    //         name: "USDT",
    //         image: "",
    //         address: "0x7d0dFC3A87243B11B831721fC5285b698D9c9ee4",
    //         decimals: 18
    //     }
    // ],
    // [fantomHex]: [
    //     {
    //         index: 1,
    //         name: "USDT",
    //         image: "",
    //         address: "0x7d0dFC3A87243B11B831721fC5285b698D9c9ee4",
    //         decimals: 18
    //     }
    // ],
    56: [
        {
            index: 1,
            name: "USDT",
            image: "",
            address: "0x55d398326f99059fF775485246999027B3197955",
            decimals: 18
        },
        {
            index: 2,
            name: "BUSD",
            image: "",
            address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
            decimals: 18
        },
        {
            index: 3,
            name: "USDC",
            image: "",
            address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
            decimals: 18
        }
    ],
    [bscHex]: [
        {
            index: 1,
            name: "USDT",
            image: "",
            address: "0x55d398326f99059fF775485246999027B3197955",
            decimals: 18
        },
        {
            index: 2,
            name: "BUSD",
            image: "",
            address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
            decimals: 18
        },
        {
            index: 3,
            name: "USDC",
            image: "",
            address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
            decimals: 18
        }
    ]
    // ,
    // 137: [
    //     {
    //         index: 1,
    //         name: "USDT",
    //         image: "",
    //         address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    //         decimals: 6
    //     },
    //     {
    //         index: 2,
    //         name: "BUSD",
    //         image: "",
    //         address: "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7",
    //         decimals: 18
    //     },
    //     {
    //         index: 3,
    //         name: "USDC",
    //         image: "",
    //         address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    //         decimals: 6
    //     }
    // ],
    // [polygonHex]: [
    //     {
    //         index: 1,
    //         name: "USDT",
    //         image: "",
    //         address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    //         decimals: 6
    //     },
    //     {
    //         index: 2,
    //         name: "BUSD",
    //         image: "",
    //         address: "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7",
    //         decimals: 18
    //     },
    //     {
    //         index: 3,
    //         name: "USDC",
    //         image: "",
    //         address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    //         decimals: 6
    //     }
    // ]
};

module.exports = supportedTokens;
