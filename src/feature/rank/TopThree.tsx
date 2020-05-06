import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import RunnerA from '../../img/runnerA.gif';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  image: {
    height: 'auto',
    width: 200,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
  },
}));

interface threetype {
  profilePic: string;
  motto: string;
  experience: number;
  _id: string;
  username: string;
}

const TopThree: React.FC<threetype> = (props) => {
  const classes = useStyles();

  return (
    <div>
      {!props.profilePic ? <img className={classes.image} src={RunnerA} alt="" /> : null }
      {!props.username ? null : <div>{props.username}님</div>}
      {!props.motto ? null : <div>좌우명 : {props.motto}</div>}
    </div>
  );
};

export default TopThree;
