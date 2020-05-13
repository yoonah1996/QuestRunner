/* eslint-disable no-unused-vars */
/* eslint-disable no-unneeded-ternary */
import React from 'react';
import { Switch, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { userLoginActions } from '../usersignin/userloginService';
import { RootState } from '..';

const useStyles = makeStyles(() => ({
  root: {
    display: 'inline',
    border: '1px solid white',
    borderRadius: '5px',
    padding: '7.5px',
  },
  switch: {
    opacity: '0.8',
    margin: '0',
  },
  disableSwitch: {
    opacity: '0.5',
  },
  text: {
    opacity: '0.8',
    color: 'lightgray',
    fontSize: '8px',
    textTransform: 'uppercase',
  },
}));

const Darkmode = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state: RootState) => state.userLogin.user);
  const isactive = user?.active.darkmode?._id ? true : false;
  const dakrmode = user?.darkmode;
  const handleChange = () => {
    dispatch(
      userLoginActions.setUser({
        user: {
          ...user,
          darkmode: !dakrmode,
        },
      }),
    );
  };
  return (
    <div className={classes.root}>
      <span className={classes.text}>darkmode</span>
      {isactive ? (
        <Switch
          className={classes.switch}
          checked={dakrmode}
          onChange={handleChange}
          color="primary"
          name="checkedB"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      ) : (
        <Switch disabled className={classes.disableSwitch} />
      )}
    </div>
  );
};

export default Darkmode;
