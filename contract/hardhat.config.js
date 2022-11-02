/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();
require("@nomiclabs/hardhat-waffle");

const { ALCHEMY_API, GOERLI_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: ALCHEMY_API,
      accounts: [GOERLI_PRIVATE_KEY]
    }    
  }
};
