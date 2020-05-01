import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Button, Grid, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem,
} from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { RouteComponentProps } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import EmojiEvents from '@material-ui/icons/EmojiEvents';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuroot: {
    width: 140,
    backgroundColor: 'rgba(255,255,255,0)',
    color: 'white',
  },
  menucolor: {
    color: 'white',
  },
}));

// { history: { push } }
const Rank: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: string) => {
    console.log(document.getElementsByClassName("MuiBottomNavigationAction-label Mui-selected"));
    setValue(event);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Top 10 List
          </Typography>
          <div>
            <BottomNavigation value={value} className={classes.menuroot}>
              <BottomNavigationAction label="My Lank" value="recents" onMouseOver={() => { handleChange('recents'); }} onFocus={() => {console.log("hi"); }} icon={<EmojiEvents className={classes.menucolor} />} />
              <BottomNavigationAction label="Back" value="favorites" onMouseOver={() => { handleChange('favorites'); }} onFocus={() => {console.log("hi"); }} icon={<NavigateBefore className={classes.menucolor} />} className={classes.menucolor} />
            </BottomNavigation>
          </div>

        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Rank;
