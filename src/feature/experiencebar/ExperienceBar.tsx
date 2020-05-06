import React from 'react';
import {
  lighten, makeStyles, createStyles, withStyles, Theme,
} from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

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
    // flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(0),
    zIndex: 3,
  },
  progressLabel: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    maxHeight: '75px', // borderlinearprogress root.height
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    '& span': {
      width: '100%',
    },
  },
}));

export default function CustomizedProgressBars() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1} justify="space-between">
        <Grid item xs={12} spacing={0}>
          <div className={classes.progressLabel}>
            <span>Application</span>
          </div>
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={90}
          />
        </Grid>
      </Grid>
    </div>
  );
}
