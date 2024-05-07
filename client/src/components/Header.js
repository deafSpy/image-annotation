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
    <AppBar className='header' position='static'>
      <h1>Web App</h1>

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
              <Link to="/register"><ListItemButton>Reigster</ListItemButton></Link>
            </Fragment>
          )}
        </List>
      </Popover>

    </AppBar>
  )
}