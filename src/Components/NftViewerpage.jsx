import React, { useState, useEffect } from 'react'
import { getTokens } from '../Resource/helpers/wallet'

const NftViewerpage = () => {
  const [tokens, setTokens] = useState([])

  useEffect(() => {
    getTokens().then((_tokens) => {
      setTokens(_tokens);
    })
  }, [])

  return (
    <div className='flex items-center justify-center flex-col h-screen'>
      <div>
        <h2 className='text-3xl font-bold text-center py-5'>Your Monster NFTs </h2>
      </div>
      {/* Wallet Nfts */}
      <div className='px-4 md:px-0 grid grid-cols-3 md:grid-cols-5 gap-6 items-center justify-center -z-10'>
        {
          // walletNfts.map((wnft) => (
          tokens.length > 0 ? tokens.map((tokenId) => (
            <div key={tokenId} className='relative'>
              <img
                src={`https://ipfs.io/ipfs/bafybeidlkqhddsjrdue7y3dy27pu5d7ydyemcls4z24szlyik3we7vqvam/${tokenId}.png`} 
                alt="nft"
                className='w-48 rounded-xl shadow-xl -z-10'
              />
              <span className='absolute top-0 px-3 py-1 bg-slate-700 bg-opacity-70 rounded-xl'>{tokenId}</span>
            </div>
          ))
          :
          <div>Loading...</div>
        }
      </div>
    </div>
  )
}

export default NftViewerpage