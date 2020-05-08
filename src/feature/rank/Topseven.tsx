/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Avatar, Chip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between ',
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
      />
    </div>
  );
};

export default Topseven;
