import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const NftViewerpage = () => {
  const [tokens, setTokens] = useState([])

  const walletAddress = useSelector((state) => {
    return state.user.address
  })

  const nftContract = useSelector((state) => {
    return state.user.monsterContract
  })

  const updateTokens = async () => {
    const tokenIds = await nftContract.walletOfOwner(walletAddress.toString())
    setTokens(tokenIds)
  }

  useEffect(() => {
    updateTokens()
  }, [walletAddress, nftContract])

  return (
    <div className={tokens.length > 18 ? 'flex items-center justify-center flex-col h-auto pt-32 pb-32' : 'flex items-center justify-center flex-col h-screen pt-32 pb-32'}>
      <div>
        <h2 className='text-3xl font-bold text-center py-9'>Your Monster NFTs </h2>
      </div>
      {/* Wallet Nfts */}
      <div className='h-full px-4 md:px-0 grid grid-cols-3 md:grid-cols-5 xl:grid-cols-6 gap-6 items-center justify-center -z-10'>
        {
          // walletNfts.map((wnft) => (
          tokens.length > 0 ? tokens.map((tokenId) => (
            <div key={Number(tokenId)} className='relative'>
              <img
                src={`https://crazymonsters.s3.amazonaws.com/CrazyMonsterImages/${Number(tokenId)}.png`} 
                alt="nft"
                className='w-32 rounded-xl shadow-xl -z-10'
              />
              <span className='absolute top-0 px-3 py-1 bg-slate-700 bg-opacity-70 rounded-xl'>{Number(tokenId)}</span>
            </div>
          ))
          :
          <div  className='h-screen'>Loading...</div>
        }
      </div>
    </div>
  )
}

export default NftViewerpage