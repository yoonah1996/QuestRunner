import React from 'react';
import {
  Theme, createStyles, makeStyles, useTheme,
} from '@material-ui/core/styles';
import { Box, Card } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import RunnerA from '../../img/runnerA.gif';
import RunnerB from '../../img/runnerB.gif';


const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  cover: {
    bgcolor: 'grey.700',
    color: 'white',
    p: 1,
    position: 'absolute',
    top: 700,
    left: '0%',
  },
  image: {
    height: 'auto',
    width: 200,
  },
}));

export default function MediaControlCard() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box
      className={classes.cover}
    >
      <img className={classes.image} src={RunnerA} alt="" />
    </Box>

  );
}
