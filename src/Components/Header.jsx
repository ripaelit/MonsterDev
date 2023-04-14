import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import {
  FaBars,
  FaCross,
  FaDiscord,
  FaDoorClosed,
  FaTwitter,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { navLinks } from "../Resource/data";
import Logo from "../Resource/images/logo.png";
import ConnectWalletButton from './Wallet/ConnectWalletButton'

const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/<INFURA_KEY>'
const injected = injectedModule()
const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: MAINNET_RPC_URL
    }
  ]
})
// const wallets = onboard.connectWallet()
// console.log(wallets)

const Header = () => {
  const pathname = useLocation().pathname;
  const [showMobMenu, setShowMobMenu] = useState(false);
  const handleMenuClick = () => setShowMobMenu((prev) => !prev);

  return (
    <div className="bg-secondaryDark fixed w-full shadow-xl">
      <div className="z-50 flex items-center justify-between py-5  text-white container mx-auto px-4 md:px-0">
        <div className="text-primary uppercase font-bold text-xl">
          <Link to="/" className="flex items-center justify-center gap-3">
            <img src={Logo} alt="" className="w-16" />
            <h1>Crazzzy Monsters</h1>
          </Link>
        </div>
        <div onClick={handleMenuClick} className="block md:hidden ">
          {showMobMenu ? (
            <AiOutlineClose className="cursor-pointer text-2xl " />
          ) : (
            <FaBars className="cursor-pointer text-2xl" />
          )}
        </div>

        <div className="hidden md:flex  gap-12 items-center justify-between text-lg">
          <ul className="inline-flex items-center gap-6 lg:gap-12 font-bold  uppercase">
            {navLinks.map((link) => (
              <li className="hover:text-secondary transition ease-in-out" key={link.name}>
                <Link
                  className={link.path == pathname ? "text-secondary" : ""}
                  to={link.path}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li key="discord-desktop">
              <a href="https://discord.com/invite/UHhgPsfny5" target="_blank">
                <FaDiscord className="text-3xl hover:text-indigo-600 transition ease-in-out" />
              </a>
            </li>
            <li key="twitter-desktop">
              <a href="https://twitter.com/CrazzzyMonsters" target="_blank">
                <FaTwitter className="text-3xl hover:text-blue-600 transition ease-in-out" />
              </a>
            </li>
          </ul>
          {/* <button
            onClick={() => {
              // if (!context.account) handleWallet();
            }}
            className="bg-primary px-4 py-2 cursor-pointer text-sm rounded-xl font-bold "
          >
            Connect Wallet
          </button> */}
          <ConnectWalletButton />
        </div>
      </div>

      <div
        className={
          showMobMenu
            ? "mobNav fixed top-0 right-0 -z-10 bg-slate-800 w-1/2 transition-all ease-in-out duration-5"
            : "mobNav fixed top-0 -right-96 z-0 bg-slate-800 w-1/2 transition-all ease-in-out duration-5"
        }
      >
        <div className="flex flex-col md:hidden h-screen gap-12 items-center justify-center text-lg">
          <ul className="inline-flex flex-col items-center justify-between gap-6 lg:gap-12 font-bold  uppercase">
            {navLinks.map((link) => (
              <li
                onClick={() => setShowMobMenu(false)}
                className="hover:text-primary transition ease-in-out"
                key={link.name}
              >
                <Link
                  className={pathname == link.path ? "text-primary" : ""}
                  to={link.path}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li key="discord-mobile">
              <a href="www.discord.com" target="_blank">
                <FaDiscord className="text-3xl hover:text-indigo-600 transition ease-in-out" />
              </a>
            </li>
            <li key="twitter-mobile">
              <a href="www.twitter.com" target="_blank">
                <FaTwitter className="text-3xl hover:text-blue-600 transition ease-in-out" />
              </a>
            </li>
          </ul>
          <div className="bg-secondary text-black px-4 py-2 cursor-pointer text-sm rounded-xl font-bold ">
            Connect Wallet
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
