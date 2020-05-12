/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core';

interface IProp {
  name: string;
}

const useStyles = makeStyles((theme) => ({
  main: {
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.background.paper,
    padding: '0 15px',
    borderRadius: '5px',
    fontWeight: 600,
  },
}));

const Category: React.FC<IProp> = ({ name }) => {
  const classes = useStyles();
  return <div className={classes.main}>{name}</div>;
};

export default Category;
