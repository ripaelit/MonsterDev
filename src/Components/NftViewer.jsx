import React from 'react'
import Nft1 from "../Resource/Nft (1).png"
import Nft2 from "../Resource/Nft (2).png"
import Nft3 from "../Resource/Nft (3).png"
import Nft4 from "../Resource/Nft (4).png"

const walletNfts = [
  {
    nft : Nft1,
    id: "#125fe"
  },
  {
    nft : Nft2,
    id: "#5fr4e"
  },
  {
    nft : Nft3,
    id: "#e78ue"
  },
  {
    nft : Nft4,
    id: "#9039d"
  },
]

const NftViewer = () => {
  return (
    <div className='flex items-center justify-center flex-col h-screen'>
        
        <div>
            <h2 className='text-3xl font-bold text-center py-5'>Your Monster NFTs </h2>

        </div>

        {/* Wallet Nfts */}
        <div className='px-4 md:px-0 grid grid-cols-3 md:grid-cols-5 gap-6 items-center justify-center -z-10'>
            {
              walletNfts.map((wnft) => (
                <div className='relative'>
                  <img src={wnft.nft} alt="nft" className='w-48 rounded-xl shadow-xl -z-10' />
                  <span className='absolute top-0 px-3 py-1 bg-slate-700 bg-opacity-70 rounded-xl'>{wnft.id}</span>
                </div>
              ))
            }
        </div>
    
    </div>
  )
}

export default NftViewer