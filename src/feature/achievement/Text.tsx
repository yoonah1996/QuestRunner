/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core';

interface IProps {
  text: string;
  color: string;
}

const Text: React.FC<IProps> = ({ text, color }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      color,
    },
  }));
  const classes = useStyles();
  return <span className={classes.root}>{text}</span>;
};

export default Text;
