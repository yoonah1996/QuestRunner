/* eslint-disable max-len */
import React from 'react';
import {
  lighten, makeStyles, createStyles, withStyles, Theme,
} from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Box, Grid } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { RootState } from '../index';

// backgroundColor은 state에서 받아와서 적용시키도록바꿀것!!


const BorderLinearProgress = withStyles({
  root: {
    height: 20,
    backgroundColor: lighten('#FFFAFA', 0.1),
  },
  bar: {
    borderRadius: 0,
    backgroundColor: '#ffff00',
  },
})(LinearProgress);

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  progressLabel: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    maxHeight: '75px', // borderlinearprogress root.height
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    '& span': {
      width: '100%',
      color: 'white',
      textShadow: '-1px -1px 0 #000, 1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000',
    },
  },
}));

export default function CustomizedProgressBars() {
  const exp = useSelector((state: RootState) => state.userLogin.user?.experience);
  // const expBarColor = useSelector((state: RootState) => state.userLogin.user?.active.experiencebar.image);
  const classes = useStyles();
  const level = Math.floor(exp! / 100);
  const expVal = (exp! % 100);
  return (
    <Box
      position="absolute"
      top={0}
      left="0%"
      width="100%"
      alignItems="flex-end"
    >
      <div className={classes.root}>
        <Grid container spacing={1} justify="space-between">
          <Grid item xs={12} spacing={0}>
            <div className={classes.progressLabel}>
              <span>
                Runner LVL :
                {` ${level.toString()}`}
              </span>
            </div>
            <BorderLinearProgress
              variant="determinate"
              color="secondary"
              value={expVal}
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
