const txHashRegex = /^0x([A-Fa-f0-9]{64})$/;

const validPhoneReg = /^[\+\(\)0-9\-\s]+$/;

const validStreetReg = /^[,#@\.:;\(\)\|\w\-\s]+$/;

const validCityReg = /^[\w\-\s]+$/;

const validStateReg = /^[\w\-\s]+$/;

const validCountryReg = /^[\w\-\s]+$/;

const validPostalCodeReg = /^[\w\-\s]+$/;



module.exports = {
    txHashRegex,
    validPhoneReg,
    validStreetReg,
    validCityReg,
    validStateReg,
    validCountryReg,
    validPostalCodeReg
};