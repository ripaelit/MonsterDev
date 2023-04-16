import { ethers } from "ethers";
import { defaultChainConfig } from "../../Resource/constants";

const hexToInt = (s) => {
  const bn = ethers.BigNumber.from(s);
  return parseInt(bn.toString());
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const switchNetwork = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: defaultChainConfig.chainId }],
    });
  } catch (err) {
    // console.log(err);
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: defaultChainConfig.chainId,
          chainName: defaultChainConfig.chainName,
          rpcUrls: defaultChainConfig.rpcUrls,
          nativeCurrency: defaultChainConfig.nativeCurrency,
          blockExplorerUrls: defaultChainConfig.blockExplorerUrls,
        },
      ],
    });
  }
};

// connect to metamask using web3
export const connectMetamask = async () => {
  // console.log("this function is called>>>")
  try {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (!(chainId === defaultChainConfig.chainId)) {
      await switchNetwork();
      await delay(2000);
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // window.ethereum.on("chainChanged", utils.reloadApp);
    // window.ethereum.on("accountsChanged", utils.reloadApp);
    // window.ethereum.on("disconnect", utils.reloadApp);

    return {
      walletProviderName: "metamask",
      address: accounts[0],
      browserWeb3Provider: new ethers.providers.Web3Provider(window.ethereum),
      serverWeb3Provider: new ethers.providers.JsonRpcProvider(
        defaultChainConfig.rpcUrls[0]
      ),
      connected: true,
      chainId: hexToInt(
        await window.ethereum.request({ method: "eth_chainId" })
      ),
    };
  } catch (err) {
    // console.log("metamask connect error:::", err);
    return null;
  }
};
