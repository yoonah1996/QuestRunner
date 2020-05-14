/* eslint-disable react/prop-types */
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
import { useDispatch } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { navActions } from './navService';
import Image from '../../img/zolla.png';
import MyInfo from './MyInfo';
import { RootState } from '..';
import { userLoginActions } from '../usersignin/userloginService';
import Darkmode from '../darkMode/Dakrmode';

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

const NavBar: React.FC<RouteComponentProps> = ({ history: { push } }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [navbarText, setNavbarText] = React.useState<string | null>('QUEST');
  const [state, setState] = React.useState({
    right: false,
  });

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    dispatch(userLoginActions.setUser({ user: null }));
    dispatch(
      userLoginActions.setLogin({
        isLogin: false,
        accessToken: null,
        refreshToken: null,
      }),
    );
    dispatch(navActions.setComponent({ navComponent: 'QUEST' }));
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setNavbarText(event.currentTarget.textContent);
    dispatch(
      navActions.setComponent({
        navComponent: event.currentTarget.textContent,
      }),
    );
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

  const trigger = () => {
    toggleDrawer('right', false);
  };

  const list = (anchor: Anchor) => (
    <div className={classes.list} role="presentation">
      <MyInfo trigger={trigger} />
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
            <Darkmode />
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleMenuClick}
            >
              QUEST
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleMenuClick}
            >
              ACHIEVEMENT
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => push('/rank')}
            >
              RANK
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleMenuClick}
            >
              STORE
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
                  <MenuItem onClick={toggleDrawer(anchor, true)}>
                    My page
                  </MenuItem>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </div>
              ))}
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
