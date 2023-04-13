import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Nft from "../Resource/images/Nft.jpg";
import BigNumber from 'bignumber.js'
const ethers = require('ethers');

const Mintpage = () => {
  const [mintCount, setMintCount] = useState(0)
  const [mintPrice, setMintPrice] = useState('0')
  const [publicPrice, setPublicPrice] = useState('0')
  const [whitelistPrice, setWhitelistPrice] = useState('0')

  const provider = useSelector((state) => {
    return state.user.provider
  })

  const walletAddress = useSelector((state) => {
    return state.user.address
  })

  const nftContract = useSelector((state) => {
    return state.user.monsterContract
  })

  const weiToEth = (weiValueStr) => {
    return ((new BigNumber(weiValueStr)).div((new BigNumber(10)).pow(18))).toString()
  }

  useEffect(() => {
    async function updatePrice() {
      if (!nftContract) {
        console.log("userEffect: nftContract is null")
        return;
      }

      if (!walletAddress) {
        console.log("userEffect: walletAddress is null")
        return;
      }

      if (!provider) {
        console.log("userEffect: provider is null")
        return;
      }

      let newPublicPrice = weiToEth((await nftContract.cost()).toString())
      setPublicPrice(weiToEth((await nftContract.cost()).toString()))

      let newWhitelistPrice = weiToEth((await nftContract.wlCost()).toString())
      setWhitelistPrice(weiToEth((await nftContract.wlCost()).toString()))

      let balance = await nftContract.balanceOf(walletAddress.toString())
      if ((new BigNumber(balance.toString())).gt(25)) {
        setMintPrice(newPublicPrice)
      } else {
        setMintPrice(newWhitelistPrice)
      }
    }
    updatePrice()
  }, [walletAddress, nftContract, provider])

  const increaseMintCount = () => {
    setMintCount((prev) => (prev < 25) ? (prev + 1) : prev)
  }

  const decreaseMintCount = () => {
    setMintCount((prev) => (prev > 0) ? (prev - 1) : prev)
  }

  const mintMonster = async () => {
    if (!nftContract) {
      console.log("nftContract is null!!!")
      return;
    }
    
    const mintValue = await nftContract.quoteMintValue(mintCount)
    console.log("mintValue", mintValue, mintValue.toString(), "mintCount", mintCount)

    const gasEstimated = await nftContract.estimateGas.mint(
      mintCount,
      {
        value: mintValue.toString()
      }
    )
    const gas = Math.ceil(gasEstimated.toNumber() * 1.5)

    const tx = await nftContract.mint(mintCount, {
      value: mintValue.toString(),
      gasLimit: gas
    })
    await tx.wait()
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
            <span className="font-bold text-secondary">Total Supply: </span>
            <span>10000</span>
          </div>
          <div className="text-3xl">
            <span className="font-bold text-secondary">Current Price: </span>
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
                  <p className="font-semibold "></p>
                </td>
                <td>
                  <p className="font-semibold "></p>
                </td>
              </tr>
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