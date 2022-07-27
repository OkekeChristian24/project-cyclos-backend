const generateRadomInteger = (minIntVal, maxIntVal) => {
    return (Math.floor(Math.random() * parseInt(maxIntVal)) + parseInt(minIntVal));
}

module.exports = generateRadomInteger
