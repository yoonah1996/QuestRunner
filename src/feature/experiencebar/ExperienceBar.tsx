/* eslint-disable camelcase */
/* eslint-disable max-len */
import React from 'react';
import {
  lighten, makeStyles, createStyles, withStyles, Theme,
} from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Box, Grid } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { RootState } from '../index';

const useStyles = makeStyles((theme: Theme) => createStyles({
  exroot: {
    height: 20,
    backgroundColor: lighten('#FFFAFA', 0.1),
  },
  exbar: (eBC: any) => ({
    borderRadius: 0,
    backgroundColor: eBC.expBarColor,
  }),
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
  const expBarColor = useSelector((state: RootState) => state.userLogin.user?.active!.exp_bar!.data!);
  const eBC = {
    expBarColor,
  };
  const classes = useStyles(eBC);
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
            <LinearProgress
              classes={{
                root: classes.exroot,
                bar: classes.exbar,
              }}
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
