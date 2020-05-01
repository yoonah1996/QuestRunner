/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core';

interface IProp {
  name: string;
}

const useStyles = makeStyles((theme) => ({
  main: {},
}));

const Category: React.FC<IProp> = ({ name }) => {
  const classes = useStyles();
  return <div className={classes.main}>{name}</div>;
};

export default Category;
