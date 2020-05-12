import React from 'react';
import {
  Theme, createStyles, makeStyles, useTheme,
} from '@material-ui/core/styles';
import { Box, Card } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import RunnerA from '../../img/runnerA.gif';
import RunnerB from '../../img/runnerB.gif';


const useStyles = makeStyles((theme: Theme) => createStyles({
  image: {
    height: 'auto',
    width: 100,
  },
}));

export default function MediaControlCard() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box
      position="absolute"
      top={-130}
      left="0%"
      alignItems="flex-end"
    >
      <img className={classes.image} src={RunnerA} alt="" />
    </Box>
  );
}
