// require("@nomiclabs/hardhat");
require("@nomiclabs/hardhat-etherscan");
require("@cronos-labs/hardhat-cronoscan");
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const getHDWallet = () => {
  const { MNEMONIC, PRIVATE_KEY } = process.env;
  if (MNEMONIC && MNEMONIC !== "") {
    return {
      mnemonic: MNEMONIC,
    }
  }
  if (PRIVATE_KEY && PRIVATE_KEY !== "") {
    return [PRIVATE_KEY]
  }
  throw Error("Private Key Not Set! Please set up .env");
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'cronosTest',
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {},
    rinkeby: {
      url: `${process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL}`,
      accounts: getHDWallet(),
    },
    goerli: {
      url: "https://goerli.infura.io/v3/f629b791925b4e98a8048281f9c03e44",
      accounts: getHDWallet(),
    },
    cronosTest: {
      url: "https://evm-t3.cronos.org",
      accounts: getHDWallet(),
      chainId: 338
    }
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts'
  },
  mocha: {
    timeout: 40000000000000
  },
  etherscan: {
    apikey: {
      cronosTest: `${process.env.CRONOSCAN_TESTNET_API_KEY}`,
      // cronos: `${process.env.CRONOSCAN_API_KEY}`,
    },
    customChains: [
      {
        network: "cronosTest",
        chainId: 338,
        urls: {
          apiURL: "https://api-goerli.etherscan.io/api",
          browserURL: "https://cronos.crypto.org/explorer/testnet3/"
        }
      }
    ]
  },
}
