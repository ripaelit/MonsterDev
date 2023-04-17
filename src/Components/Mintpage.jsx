import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Nft from '../Resource/images/Nft.jpg'
import { ethers } from 'ethers'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'

const Mintpage = () => {
  const [mintCount, setMintCount] = useState(1)
  const [supply, setSupply] = useState('0')
  const [mintPrice, setMintPrice] = useState(0)
  const [publicPrice, setPublicPrice] = useState(0)
  const [whitelistPrice, setWhitelistPrice] = useState(0)
  const provider = useSelector((state) => {
    return state.user.provider
  })
  const walletAddress = useSelector((state) => {
    return state.user.address
  })
  const nftContract = useSelector((state) => {
    return state.user.monsterContract
  })

  const updatePrice = async () => {
    if (!nftContract || !walletAddress || !provider) {
      return
    }

    const _supply = (await nftContract.totalSupply()).toString()
    setSupply(_supply)

    const newPublicPrice = Number(ethers.utils.formatEther(await nftContract.cost()))
    setPublicPrice(newPublicPrice)

    const newWhitelistPrice = Number(ethers.utils.formatEther(await nftContract.wlCost()))
    setWhitelistPrice(newWhitelistPrice)

    const isWhitelisted = await nftContract.whitelisted(walletAddress.toString())

    if (isWhitelisted) {
      const balance = (await nftContract.balanceOf(walletAddress.toString())).toString()
      if (Number(balance) < 25) {
        setMintPrice(newWhitelistPrice)
        return
      }
    }
    setMintPrice(newPublicPrice)
  }

  useEffect(() => {
    updatePrice()
  }, [walletAddress, nftContract, provider])

  const increaseMintCount = () => {
    setMintCount((prev) => (prev < 25) ? (prev + 1) : prev)
  }
  const decreaseMintCount = () => {
    setMintCount((prev) => (prev > 1) ? (prev - 1) : prev)
  }
  const mintMonster = async () => {
    if (!nftContract || !walletAddress || !provider) {
      return
    }
    const totalMintPrice = (await nftContract.quoteMintValue(mintCount)).toString()
    const web3 = new Web3(window.ethereum)
    const balanceNative = await web3.eth.getBalance(walletAddress)
    // console.log("nftContract:::", nftContract)
    // console.log("walletAddress:::", walletAddress)
    // console.log("totalMintPrice:::", totalMintPrice)
    // console.log("balanceNative:::", balanceNative)
    if ((new BigNumber(balanceNative)).lt(new BigNumber(totalMintPrice))) {
      // console.log("Not enough balance")
      window.alert("Your balance is insufficient.")
      return
    }
    const gasEstimated = await nftContract.estimateGas.mint(
      mintCount,
      {
        value: totalMintPrice
      }
    )
    const gas = Math.ceil(gasEstimated.toNumber() * 2)
    const tx = await nftContract.mint(mintCount, {
      value: totalMintPrice,
      gasLimit: gas
    })
    await tx.wait()

    const _supply = (await nftContract.totalSupply()).toString()
    setSupply(_supply)
  }

  return (
    <div className='pt-32'>
      <div className="flex flex-col items-center justify-center gap-12">
        {/* nft */}
        <div className="">
          <img src={Nft} alt="" className="w-72 md:w-96 shadow-xl rounded-xl " />
        </div>
        {/* Details */}
        <div className="text-center pb-6 space-y-4">
          <div className="text-3xl">
          <div className="text-3xl">
          <span className="font-bold text-secondary">Minted: {supply}/10000</span>
          </div>
          </div>
          <div className="text-3xl">
            <span className="font-bold text-secondary">Current Price : </span>
            <span>{mintPrice} CRO</span>
          </div>
          <div>
          <div className='flex flex-row items-center justify-center gap-6 pt-4 pb-4'>
          <button onClick={decreaseMintCount} className='p-1 text-3xl font-bold text-black rounded-xl px-6 bg-gray-400 hover:bg-secondary transition-all ease-in-out active:text-2xl '>-</button>
            <div className={mintCount !== 0 ? 'text-4xl font-bold text-primary' : 'text-3xl font-bold'}>{mintCount}</div>
            <button onClick={increaseMintCount} className='p-1 text-3xl font-bold text-black rounded-xl px-6 bg-gray-400 hover:bg-secondary transition-all ease-in-out active:text-2xl '>+</button>
          </div>
            <button
              onClick={mintMonster}
              className="px-12 py-3 bg-primary hover:text-2xl transition-all ease-in-out font-bold uppercase rounded-lg text-xl"
            >
              Mint Monster
            </button>
          </div>
        </div>
      </div>

      {/* Minting Info */}
      <div className="flex flex-col items-center md:flex-row w-full gap-12 px-12 pb-24">
        {/* MINT INFO */}
        <div className="w-full md:w-1/2 bg-slate-300 bg-opacity-10 text-white rounded-xl p-6">
          <div className="">
            <h5 className="mb-4 text-2xl text-primary">
              {" "}
              <b>MINT DETAILS</b>
            </h5>
          </div>
          <div className="">
            <table className="w-full text-lg">
              <tbody>
                <tr className="border-t border-opacity-50">
                  <td className="py-3 pl-3">
                    <p className="font-semibold ">Public Price</p>
                  </td>
                  <td>
                    <p className="font-semibold ">{publicPrice} CRO</p>
                  </td>
                </tr>
                <tr className="border-t border-opacity-50">
                  <td className="py-3 pl-3">
                    <p className="font-semibold ">Whitelist Price</p>
                  </td>
                  <td>
                    <p className="font-semibold ">{whitelistPrice} CRO</p>
                  </td>
                </tr>
                <tr className="border-t border-opacity-50">
                  <td className="py-3 pl-3">
                    <p className="font-semibold ">Whitelist max mint</p>
                  </td>
                  <td>
                    <p className="font-semibold ">25 NFTs</p>
                  </td>
                </tr>
                <tr className="border-t border-opacity-50">
                  <td className="py-3 pl-3">
                    <p className="font-semibold ">Max mint per tx</p>
                  </td>
                  <td>
                    <p className="font-semibold ">25 NFTs</p>
                  </td>
                </tr>
                <tr className="border-t border-opacity-50">
                <td className="py-3 pl-3">
                  <p className="font-semibold ">Contract Address</p>
                </td>
                <td>
                  <a target='_blank' rel="noreferrer" href='https://cronoscan.com/address/0x8f2836874dc85b81c2cf0421af593e6e8d5dffa1'>0x8f28...dffa1</a>
                </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* PROJECT iNFO */}
        <div className="w-full md:w-1/2 bg-slate-300 bg-opacity-10 text-white rounded-xl p-6">
          <div className="">
            <h3 className="text-2xl font-bold text-primary">Crazzzy Monsters</h3>
            <br />
          </div>
          <div className="">
            <h5 className="text-2xl"> DESCRIPTION</h5>
            <p className="mt-2 text-lg">
              10.000 Crazzzy Monster Apes on the Cronos Blockchain, this is Gen1!
              The OG Families of Crazzzy Monsters. Be Ready to be overwhelmed by Royaltiezzz, Utilitiezzz, Giveawayzzz, airdropzzz and much more...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mintpage