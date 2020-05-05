import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {
  Button, Grid, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Paper,
} from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { RouteComponentProps } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import EmojiEvents from '@material-ui/icons/EmojiEvents';
import TopThree from './TopThree';

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

const threeStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    top: '100px',
  },
  paper: {
    height: 300,
    width: 250,
    backgroundColor: 'rgba(75,75,75,1)',
  },
  control: {
    padding: theme.spacing(2),
  },
}));

// { history: { push } }
const Rank: React.FC<RouteComponentProps> = ({ history: { push } }) => {
  const classes = useStyles();
  const threeClasses = threeStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: string) => {
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
          <Box color="text.primary">
            <BottomNavigation value={value} className={classes.menuroot}>
              <BottomNavigationAction color="white" label="My Lank" value="recents" onMouseOver={() => { handleChange('recents'); }} onFocus={() => {console.log("hi"); }} icon={<EmojiEvents className={classes.menucolor} />} />
              <BottomNavigationAction color="white" label="Back" value="favorites" onMouseOver={() => { handleChange('favorites'); }} onFocus={() => {console.log("hi"); }} icon={<NavigateBefore className={classes.menucolor} />} className={classes.menucolor} />
            </BottomNavigation>
          </Box>
        </Toolbar>
      </AppBar>
      <Grid container className={threeClasses.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={7}>
            {[0, 1, 2].map((el) => (
              <Grid key={el} item>
                <div className={threeClasses.paper}>
                  <TopThree />
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Rank;
