import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import * as walletMetamask from '../../Resource/helpers/metamask'
import * as walletConnect from '../../Resource/helpers/walletconnect'
import * as walletDefiwallet from '../../Resource/helpers/defiwallet'

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 350,
  width: '70%',
  backgroundColor: 'rgba(196, 196, 196, 0.7)',
  boxShadow: 24,
  borderRadius: 5,
  p: 4
}

const headerStyle = {
  fontSize: '25px',
  fontWeight: 600,
  fontFamily: 'Chewy',
  color: '#280D5f'
}

const buttonStyle = {
  marginTop: 2,
  fontSize: 20,
  fontFamily: 'Chewy',
  background: 'rgba(253, 218 , 51, 0.8)',
  '&:hover': {
    background: 'rgba(253, 218, 158, 0.8)'
  },
  padding: '10px 30px',
  display: 'flex',
  justifyContent: 'space-between'
}

export default function KeepMountedModal(props) {
  const handleClose = () => props.setOpen(false)
  let wallet = null

  const onConnect = async (connector) => {
    // console.log('start connecting wallet')
    props.setOpen(false)
    switch (connector) {
      case 'metamask':
        wallet = await walletMetamask.connect()
        break
      case 'walletconnect':
        wallet = await walletConnect.connect()
        break
      case 'defiwallet':
        wallet = await walletDefiwallet.connect()
        break
      default:
        wallet = await walletMetamask.connect()
    }
    if (wallet !== null)
      props.setWallet(wallet)
    // console.log('end connecting wallet')
  }

  return (
    <div>
      <Modal
        keepMounted
        open={props.open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={boxStyle}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            sx={headerStyle}
          >
            Connect Wallet
          </Typography>
          <Button fullWidth sx={buttonStyle} onClick={() => onConnect('metamask')}>
            <img
              src="/images/metamask.svg"
              alt="metamask"
              width="30"
              height="30"
              style={{ marginRight: 10 }}
            />
            Metamask
          </Button>
          <Button
            fullWidth
            sx={buttonStyle}
            onClick={() => onConnect('walletconnect')}
          >
            <img
              src="/images/walletconnect.svg"
              alt="walletconnect"
              width="30"
              height="30"
              style={{ marginRight: 10 }}
            />
            Wallet Connect
          </Button>
          <Button fullWidth sx={buttonStyle} onClick={() => onConnect('defiwallet')}>
            <img
              src="/images/crypto.png"
              alt="crypto"
              width="30"
              height="30"
              style={{ marginRight: 10 }}
            />
            DeFi Wallet Connect
          </Button>
        </Box>
      </Modal>
    </div>
  )
}
