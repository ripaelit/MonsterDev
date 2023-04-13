/**
 *  This script will calculate the constructor arguments for the `verify` function and call it.
 *  You can use this script to verify the contract on etherscan.io.
 */

require('@nomiclabs/hardhat-etherscan')
const hre = require('hardhat')
 
async function main() {
  await hre.run('verify:verify', {
    address: '0xF7e3Abd58F6F1f544BBd85B19E21A8Bd9A7CBF0A', // Deployed contract address
    constructorArguments: []
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
