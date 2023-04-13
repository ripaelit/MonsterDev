import React from 'react'
import { Link } from 'react-router-dom'
import {FaTwitter, FaDiscord, FaLink} from "react-icons/fa"

const Royaltiespage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-6'>
        <div className='border border-2 border-gray-300 w-fit'>
            <h2 className='text-3xl font-bold text-center py-5 px-9 text-primary'>Royalties </h2>

        </div>
        <div className='text-2xl font-bold'>
            <h2>Crazzzy Monsters</h2>
        </div>
        <div className='flex gap-6 px-4 md:px-0'>
            <div className='bg-secondary px-6 py-2 rounded-lg bg-opacity-80 text-black text-center'>
                <h3 className='font-bold'>Available to claim</h3>
                <h3>0.00 CRO</h3>
            </div>
            <div className='bg-secondary px-6 py-2 rounded-lg bg-opacity-80 text-black text-center'>
                <h3 className='font-bold'>Total Distributed</h3>
                <h3>5.84K CRO</h3>
            </div>
        </div>
        <div>

        <button className='bg-gray-300 px-6 py-2 rounded-lg bg-opacity-20 hover:bg-primary  text-xl hover:text-2xl font-bold transition-all ease-in-out'>Claim 0.23 CRO</button>
        </div>

        {/* Social Links */}
        <div className='inline-flex gap-12 mt-6 text-2xl'>
            <div>
                <Link>
                <FaTwitter className='hover:text-secondary' />
                </Link>
            </div>
            <div>
                <Link>
                <FaDiscord className='hover:text-secondary' />
                </Link>
            </div>
            <div>
            <Link>
                <FaLink className='hover:text-secondary' />
                </Link>
            </div>

        </div>
    </div>
  )
}

export default Royaltiespage