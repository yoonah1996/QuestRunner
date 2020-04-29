import React from 'react';
import {
  Theme, createStyles, makeStyles, useTheme,
} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import RunnerA from '../../img/runnerA.gif';
import RunnerB from '../../img/runnerB.gif';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  cover: {
    width: 200,
    height: 300,
  },
}));

export default function MediaControlCard() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={RunnerB}
        title="RunnerAvatar"
      />
    </Card>
  );
}
