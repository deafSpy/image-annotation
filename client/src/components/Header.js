import {Fragment, useState} from 'react'
import {
  AppBar,
  IconButton,
  Avatar,
  Popover,
  List,
  ListSubheader,
  ListItemButton,
} from '@mui/material'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { APP_LOGO } from '../constants/common'
import '../styles/header.css'

export default function Header() {
  const {isLoggedIn, account, logout} = useAuth()

  const [anchorEl, setAnchorEl] = useState(null)
  const [popover, setPopover] = useState(false)
  const [register, setRegister] = useState(false)

  const openPopover = (e) => {
    setPopover(true)
    setAnchorEl(e.currentTarget)
  }

  const closePopover = () => {
    setPopover(false)
    setAnchorEl(null)
  }


  return (
    <div className='header'>
          <Link to="/">
              <img src={APP_LOGO} alt="Image Annotation" style={{width: "min(200px, 20vw)"}} />
          </Link>

        <div className='middle-container'>
              <div className='middle-container-item'>
                  <Link to="/upload">Upload</Link>
              </div>
              <div className='middle-container-item'>
                  <Link to="/gallery">Gallery</Link>
              </div>
        </div>

      <IconButton onClick={openPopover}>
          <Avatar src={account?.username || ''} alt={account?.username || ''} />
      </IconButton>

      <Popover
        anchorEl={anchorEl}
        open={popover}
        onClose={closePopover}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}>
        <List style={{minWidth: '100px'}}>
          <ListSubheader style={{textAlign: 'center'}}>
            Hello, {isLoggedIn ? account.username : 'Guest'}
          </ListSubheader>

          {isLoggedIn ? (
            <ListItemButton onClick={logout}>Logout</ListItemButton>
          ) : (
            <Fragment>
              <Link to="/login"><ListItemButton>Login</ListItemButton></Link>
              <Link to="/register"><ListItemButton>Register</ListItemButton></Link>
            </Fragment>
          )}
        </List>
      </Popover>

    </div>
  )
}