import React from 'react';
import {
  lighten, makeStyles, createStyles, withStyles, Theme,
} from '@material-ui/core/styles';
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
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(0),
  },
}));

export default function CustomizedProgressBars() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BorderLinearProgress
        className={classes.margin}
        variant="determinate"
        color="secondary"
        value={90}
      />
    </div>
  );
}
