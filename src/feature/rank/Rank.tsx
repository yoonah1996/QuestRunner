/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {
  Button, Grid, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Paper,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { RouteComponentProps } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import EmojiEvents from '@material-ui/icons/EmojiEvents';
import axios from 'axios';
import { serverHttp } from '../common/utils';
import TopThree from './TopThree';
import Topseven from './Topseven';
import crown from '../../img/crown.png';


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
    '& span': {
      color: 'white',
    },
  },
}));

const threeStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    top: '100px',
  },
  paper0: {
    height: 640,
    width: 250,
    position: 'relative',
    backgroundColor: '#ffff00',
    '& div': {
      backgroundColor: 'white',
    },
    '& img': {
      color: 'white',
    },
  },
  paper1: {
    height: 520,
    width: 250,
    position: 'relative',
    top: '180px',
    backgroundColor: '#9e9e9e',
    '& div': {
      backgroundColor: 'white',
    },
  },
  paper2: {
    height: 400,
    width: 250,
    position: 'relative',
    top: '300px',
    backgroundColor: '#8d6e63',
    '& div': {
      backgroundColor: 'white',
    },
  },
  control: {
    padding: theme.spacing(2),
  },
  crownImg: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 'auto',
    backgroundColor: 'white',
    width: 60,
  },
  seven: {
    position: 'fixed',
    bottom: '5px',
    width: '100%',
    backgroundColor: 'white',
    flexGrow: 1,
  },
}));

const Rank: React.FC<RouteComponentProps> = ({ history: { push } }) => {
  const classes = useStyles();
  const threeClasses = threeStyles();
  const [value, setValue] = React.useState('');
  const [three, setThree] = React.useState([]);
  const [seven, setSeven] = React.useState([]);

  interface threetype {
    profilePic: string;
    motto: string;
    experience: number;
    _id: string;
    username: string;
  }

  const getRankTop = async () => {
    const Ranks = await axios.get(`${serverHttp}/rank`, {
      params: {
        top: '7',
      },
    }).then((res) => res.data).catch((err) => err);
    setThree(Ranks.slice(0, 3));
    setSeven(Ranks.slice(3));
  };

  useEffect(() => {
    getRankTop();
  }, []);

  const handleChange = (event: string) => {
    setValue(event);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Top 7 List
          </Typography>
          <Box color="text.primary">
            <BottomNavigation value={value} className={classes.menuroot}>
              <BottomNavigationAction label="My Rank" value="myrank" onMouseOver={() => { handleChange('myrank'); }} onFocus={() => { console.log('마이랭크'); }} icon={<EmojiEvents className={classes.menucolor} />} className={classes.menucolor} />
              <BottomNavigationAction label="Back" value="back" onMouseOver={() => { handleChange('back'); }} onFocus={() => { push('/mainPage'); }} icon={<NavigateBefore className={classes.menucolor} />} className={classes.menucolor} />
            </BottomNavigation>
          </Box>
        </Toolbar>
      </AppBar>
      <Grid container className={threeClasses.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={7}>
            <Grid item>
              <div className={threeClasses.paper1}>
                <TopThree {...three[1]} />
              </div>
            </Grid>
            <Grid item>
              <img className={threeClasses.crownImg} src={crown} alt="" />
              <div className={threeClasses.paper0}>
                <TopThree {...three[0]} />
              </div>
            </Grid>
            <Grid item>
              <div className={threeClasses.paper2}>
                <TopThree {...three[2]} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <AppBar position="static"><Toolbar /></AppBar> */}
      <Alert icon={false} variant="outlined" severity="warning" className={threeClasses.seven}>
        <Grid container spacing={3}>
          {seven.map((el) => (
            <Topseven {...el} />
          ))}
        </Grid>
      </Alert>
    </div>

  );
};

export default Rank;
