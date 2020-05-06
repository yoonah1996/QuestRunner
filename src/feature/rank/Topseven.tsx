import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
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
const Topseven: React.FC<threetype> = (props) => {
  const classes = useStyles();

  return (
    <Grid item xs={6} sm={3}>
      {props.username}
    </Grid>
  );
};

export default Topseven;
