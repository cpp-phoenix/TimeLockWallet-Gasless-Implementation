require('dotenv').config();
const hre = require("hardhat");

async function main() {
  const FIVE_MINUTES_IN_SECS = 5 * 60;

  const TimelockWallet = await hre.ethers.getContractFactory("TimelockWallet");
  const timelockWallet = await TimelockWallet.deploy(process.env.GOERLI_BICO_FORWARD, FIVE_MINUTES_IN_SECS);

  await timelockWallet.deployed();

  console.log(
    `Contract is deployed to ${timelockWallet.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});