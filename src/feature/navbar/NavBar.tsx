/* eslint-disable no-shadow */
/* eslint-disable max-len */
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Image from '../../img/zolla.png';
import MyInfo from './MyInfo';


const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    background: '#bf934b',
  },
  list: {
    width: 250,
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

type Anchor = 'right';

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [navbarText, setNavbarText] = React.useState<string | null>('MainPage');
  const [state, setState] = React.useState({
    right: false,
  });

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setNavbarText(event.currentTarget.textContent);
  };

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    handleClose();
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <div
      className={classes.list}
      role="presentation"
    >
      <MyInfo />
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {navbarText}
          </Typography>
          <div className={classes.menuButton}>
            <Button variant="outlined" color="inherit" href="#contained-buttons" onClick={handleMenuClick}>
              QuestList
            </Button>
            <Button variant="outlined" color="inherit" href="#contained-buttons" onClick={handleMenuClick}>
              Achievement
            </Button>
            <Button variant="outlined" color="inherit" href="#contained-buttons" onClick={handleMenuClick}>
              Rank
            </Button>
            <Button variant="outlined" color="inherit" href="#contained-buttons" onClick={handleMenuClick}>
              Store
            </Button>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              {(['right'] as Anchor[]).map((anchor) => (
                <div>
                  <MenuItem onClick={toggleDrawer(anchor, true)}>My page</MenuItem>
                  <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                    {list(anchor)}
                  </Drawer>
                </div>
              ))}
              <MenuItem onClick={handleClose}>Sign Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
