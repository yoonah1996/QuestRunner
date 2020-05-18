/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Avatar, Chip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    padding: 10,
  },
  seven: {
    backgroundColor: 'white',
    color: 'black',
    verticalAlign: 'middle',
  },
}));

interface threetype {
  profilePic: string;
  motto: string;
  experience: number;
  _id: string;
  username: string;
}

interface totaltype {
  rankInfo: threetype;
  rank: number;
}

const Topseven: React.FC<totaltype> = ({ rankInfo, rank }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Chip
        avatar={<Avatar>{rank + 4}</Avatar>}
        label={`${rankInfo.username}님`}
        variant="outlined"
        color="secondary"
        className={classes.seven}
      />
    </div>
  );
};

export default Topseven;
