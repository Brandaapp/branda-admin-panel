import { access } from '../../utils/rolesUtils';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  List,
  Menu,
  MenuItem,
  SwipeableDrawer,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Links from './Links';
import Image from 'next/image';

export default function Navbar () {
  const [session] = useSession();
  const router = useRouter();

  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = open => (event) => {
    if (event?.type === 'keydown' &&
    (event?.key === 'Tab' || event?.key === 'Shift')) {
      return;
    }

    setDrawerOpen(open);
  };

  if (session) {
    return (
      <AppBar position="sticky" sx=
        {{
          position: 'fixed',
          backgroundColor: '#1B4370',
          color: 'white'
        }}
      >
        <Container maxWidth="100%">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              align='center'
              href={access[session.user.type].redirectTo}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                paddingRight: 4
              }}
            >
              <Image alt='' src="/logo-fancy.png" width={50} height={50} />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <SwipeableDrawer
                anchor={'left'}
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <List>
                    <Links type={session.user.type} drawer />
                  </List>
                </Box>
              </SwipeableDrawer>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href={access[session.user.type].redirectTo}
              align='center'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              <Image alt='' src="/logo-fancy.png" width={50} height={50} />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Links type={session.user.type} />
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Settings Icon" src={session.user.image} />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={'Log Out'} onClick={async () => { await signOut(); router.push('/login'); }}>
                  <Typography textAlign="center">{'Log Out'}</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  } else return null;
}
