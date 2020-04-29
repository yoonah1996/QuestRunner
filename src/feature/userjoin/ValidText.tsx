/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: any) => ({
  error: {
    color: '#FF4081',
    margin: '0px',
  },
}));

interface IProp {
  error: string;
}

const ValidText: React.FC<IProp> = ({ error }) => {
  const classes = useStyles();
  return <h5 className={classes.error}>{error}</h5>;
};

export default ValidText;
