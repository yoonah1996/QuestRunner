/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Box, Button, Grid, AppBar, Toolbar, Typography, Modal, Paper, BottomNavigationAction, BottomNavigation,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { RouteComponentProps } from 'react-router';
import { NavigateBefore, EmojiEvents } from '@material-ui/icons';
import axios from 'axios';
import { serverHttp } from '../common/utils';
import TopThree from './TopThree';
import Topseven from './Topseven';
import crown from '../../img/crown.png';
import goodImg from '../../img/good.png';
import one from '../../img/one.png';
import two from '../../img/two.png';
import three from '../../img/three.png';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  buttoncolor: {
    backgroundColor: 'rgba(255,255,255,0)',
    color: 'white',
  },
  image: {
    height: 'auto',
    width: 150,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const rankStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    top: '100px',
  },
  paper0: {
    height: 640,
    width: 250,
    position: 'relative',
    backgroundColor: '#ffc400',
    backgroundImage: `url(${one})`,
    backgroundSize: '100px 100px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 320px',
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
    backgroundColor: '#ffc400',
    backgroundImage: `url(${two})`,
    backgroundSize: '100px 100px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 320px',
    '& div': {
      backgroundColor: 'white',
    },
  },
  paper2: {
    height: 450,
    width: 250,
    position: 'relative',
    top: '250px',
    backgroundImage: `url(${three})`,
    backgroundSize: '100px 100px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 320px',
    backgroundColor: '#ffc400',
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
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: 'center',
  },
}));

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    outline: 'none',
    backgroundColor: 'black',
    color: 'white',
  };
};

const Rank: React.FC<RouteComponentProps> = ({ history: { push } }) => {
  const classes = useStyles();
  const rankClasses = rankStyles();
  const [value, setValue] = React.useState('');
  const [three, setThree] = React.useState([]);
  const [seven, setSeven] = React.useState([]);
  const [myrank, setMyrank] = React.useState({
    username: '',
    rank: '',
  });
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

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
    console.log(Ranks);
    setThree(Ranks.slice(0, 3));
    setSeven(Ranks.slice(3, 7));
  };

  useEffect(() => {
    getRankTop();
  }, []);

  const handleChange = (event: string) => {
    setValue(event);
  };

  const handleOpen = async () => {
    const myRanks = await axios.get(`${serverHttp}/myRank`, {
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZWFkODQxOTAxYmE0NjI3MjM3YTkzM2UiLCJpYXQiOjE1ODg4NTMzMTQsImV4cCI6MTU4ODg1NjkxNH0.qesxCME5ZTyRspWyGPpmI1yEJVJej_c4kwKy24ZUvfw',
      },
    }).then((res) => res.data).catch((err) => err);
    setOpen(true);
    console.log(myRanks);
    setMyrank(myRanks);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.root}>
            Top 7 List
          </Typography>
          <Box color="text.primary">
            <BottomNavigation value={value} className={classes.menuroot}>
              <BottomNavigationAction label="My Rank" value="myrank" onMouseOver={() => { handleChange('myrank'); }} onClick={handleOpen} icon={<EmojiEvents className={classes.menucolor} />} className={classes.menucolor} />
              <BottomNavigationAction label="Back" value="back" onMouseOver={() => { handleChange('back'); }} onClick={() => { push('/mainPage'); }} icon={<NavigateBefore className={classes.menucolor} />} className={classes.menucolor} />
            </BottomNavigation>
          </Box>
        </Toolbar>
      </AppBar>
      <Grid container className={rankClasses.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={7}>
            <Grid item>
              <div className={rankClasses.paper1}>
                <TopThree {...three[1]} />
              </div>
            </Grid>
            <Grid item>
              <img className={rankClasses.crownImg} src={crown} alt="" />
              <div className={rankClasses.paper0}>
                <TopThree {...three[0]} />
              </div>
            </Grid>
            <Grid item>
              <div className={rankClasses.paper2}>
                <TopThree {...three[2]} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className={rankClasses.seven}>
        {/* <Grid container spacing={3}> */}
        {seven.map((el, ind) => (
          <Topseven rankInfo={el} rank={ind} />
        ))}
        {/* </Grid> */}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={rankClasses.paper}>
          <img className={classes.image} src={goodImg} alt="" />
          <p />
          {console.log(myrank)}
          <div>
            {myrank.username}
            님의 랭킹은
          </div>
          <div>
            {myrank.rank + 1}
            위 입니다
          </div>
          <p />
          <Button variant="outlined" className={classes.buttoncolor} onClick={handleClose}>닫기</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Rank;
