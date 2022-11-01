/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.ALCHEMY_API,
      accounts: [process.env.GOERLI_PRIVATE_KEY]
    }    
  }
};
