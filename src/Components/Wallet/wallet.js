import abi from "../../Resource/abi.json";
import Web3 from "web3"
import { ContractAddress } from '../../Resource/constants'

// connect to metamask using web3
export const connectWallet = async () => {
  const { ethereum } = window;
  if (ethereum) {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log("Connected", accounts[0]);
    return ethereum;
  } else {
    // create an alter
    alert("Please install metamask");
    return;
  }
}

export const disconnectWallet = async () => {
  const { ethereum } = window;
  if (ethereum) {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log("Disconnected", accounts[0]);
  } else {
    // create an alter
    alert("Please install metamask");
  }
}

// connect to a specific smart contract on cronos network
export const connectContract = async () => {
  const { ethereum } = window;
  const web3 = new Web3(ethereum);
  if (ethereum) {
    window.contract = await new web3.eth.Contract(abi, ContractAddress);

    //set up your Ethereum transaction


    return window.contract;
  } else {
    // create an alter
    alert("Please install metamask");
  }
}

// check if wallet is connected ( metamask )
export const isConnected = async () => {
  const { ethereum } = window;
  if (ethereum) {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log("Connected", accounts[0]);
    return true;
  } else {
    // create an alter
    alert("Please install metamask");
    return false;;
  }
}

// if network/chain is not cronos, then ask to switch network
export const switchNetwork = async () => {
  const { ethereum } = window;
  if (ethereum) {
    // cronos id id 338 ( testnet )
    const chainId = await ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x4") {
      await ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0x4" }] });
      return true;
    } else {
      return false;
    }
  } else {
    // create an alter
    alert("Please install metamask");
  }
}

export const getTokens = async () => {
  await connectContract();
  const currentWalletAddress = window.ethereum.selectedAddress
  console.log("currentWalletAddress:::", window.ethereum.selectedAddress);
  const tokenIds = await window.contract.methods.walletOfOwner(currentWalletAddress).call();
  console.log("tokens:::", tokenIds)
  return tokenIds;
}

// mint x number of nfts
export const mintNFT = async (count = 1) => {
  const { ethereum } = window;
  if (ethereum) {
    await connectContract();
    //sign transaction via Metamask
    try {
      const txHash = await window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [{
            from: window.ethereum.selectedAddress,
            to: ContractAddress,
            gas: '0x105208',
            data: window.contract
              .methods
              .mint(parseInt(count))
              .encodeABI(),
          }],
        });
      console.log({
        success: true,
        status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash
      })
    } catch (error) {
      console.log({
        success: false,
        status: "😥 Something went wrong: " + error.message
      })
    }
  } else {
    // create an alter
    alert("Please install metamask");
  }
}

// get all the nfts (current contracts) from the user account
export const init = async () => {
  let provider = window.ethereum;
  let selectedAccount;

  if (typeof provider !== 'undefined') {

    provider
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
      });
    window.ethereum.on('accountsChanged', function (accounts) {
      selectedAccount = accounts[0];
      console.log(`Selected account changed to ${selectedAccount}`);
    });
  }
  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  if (networkId === 338 || networkId === 25) {
    const contract = new web3.eth.Contract(abi, ContractAddress);
    return { web3, networkId, contract };
  } else {
    // // ask to switch network
    // const switchNetwork = await switchNetwork();
  }
};
