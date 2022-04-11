const ethers = require("ethers");

const verifyMessage = ( message, address, signature ) => {
    try {
      const signerAddr = ethers.utils.verifyMessage(message, signature);
      console.log("signer addr: ", signerAddr);
      console.log("sent addr: ", address);
      if (signerAddr !== address) {
        return false;
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  module.exports = verifyMessage;