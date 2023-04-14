import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaMaskOnboarding from '@metamask/onboarding'
import useMedia from '../../hooks/useMedia'
import { connectAccount, onLogout, setShowWrongChainModal, chainConnect } from '../../Resource/globalState/user'

const WalletConnectButton = () => {
  const dispatch = useDispatch()
  const isMobile = useMedia('(max-width: 1200px)')

  const walletAddress = useSelector((state) => {
    return state.user.address
  })

  const correctChain = useSelector((state) => {
    return state.user.correctChain
  })

  const user = useSelector((state) => {
    return state.user
  })

  const needsOnboard = useSelector((state) => {
    return state.user.needsOnboard
  })

  const connectWalletPressed = async () => {
    if (needsOnboard) {
      const onboarding = new MetaMaskOnboarding()
      onboarding.startOnboarding()
    } else {
      dispatch(connectAccount())
    }
  }

  const handleWrongChain = () => {
    dispatch(setShowWrongChainModal(false))
    dispatch(chainConnect())
    // console.log("handleWrongChain>>>")
  }

  const logout = async () => {
    dispatch(onLogout())
  }

  useEffect(() => {
    // console.log("WalletConnectButton --> walletAddress:::", walletAddress);
  }, [walletAddress])

  useEffect(() => {
    // console.log("walletAddress:::", walletAddress)
    let defiLink = localStorage.getItem('DeFiLink_session_storage_extension')
    if (defiLink) {
      try {
        const json = JSON.parse(defiLink)
        if (!json.connected) {
          dispatch(onLogout())
        }
      } catch (error) {
        dispatch(onLogout())
      }
    }
    if (
      localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER') ||
      window.ethereum ||
      localStorage.getItem('DeFiLink_session_storage_extension')
    ) {
      if (!user.provider) {
        if (window.navigator.userAgent.includes('Crypto.com DeFiWallet')) {
          dispatch(connectAccount(false, 'defi'))
        } else {
          dispatch(connectAccount())
        }
      }
    }
    if (!user.provider) {
      if (window.navigator.userAgent.includes('Crypto.com DeFiWallet')) {
        dispatch(connectAccount(false, 'defi'))
      }
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (walletAddress && !correctChain) {
      handleWrongChain()
    }
  }, [walletAddress, correctChain])

  return (
    <div>
      {
        !walletAddress &&
        <button
          onClick={() => {
            connectWalletPressed()
          }}
          className="bg-primary px-4 py-2 cursor-pointer text-sm rounded-xl font-bold "
        >
          Connect Wallet
        </button>
      }
      {
        walletAddress &&
        !correctChain &&
        // !user.showWrongChainModal &&
        <button
          onClick={() => {
            handleWrongChain()
          }}
          className="bg-primary px-4 py-2 cursor-pointer text-sm rounded-xl font-bold "
        >
          Switch Network
        </button>
      }
      {
        walletAddress && correctChain &&
        <button
          onClick={() => {
            logout()
          }}
          className="bg-primary px-4 py-2 cursor-pointer text-sm rounded-xl font-bold "
        >
          {walletAddress.substr(0,12)+"..."}
        </button>
      }
    </div>
  )
}

export default memo(WalletConnectButton)
