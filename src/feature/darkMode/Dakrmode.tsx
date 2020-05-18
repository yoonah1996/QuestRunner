/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unneeded-ternary */
import React, { useState } from 'react';
import { Switch, makeStyles, Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { userLoginActions } from '../usersignin/userloginService';
import { RootState } from '..';
import { serverHttp } from '../common/utils';

interface IProp {
  goToLoginPage: Function;
}

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
function Alert(props: AlertProps) {
  return <MuiAlert elevation={3} variant="filled" {...props} />;
}
const Darkmode: React.FC<IProp> = ({ goToLoginPage }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state: RootState) => state.userLogin.user);
  const token = useSelector((state: RootState) => state.userLogin.accessToken);
  const dakrmode = user?.darkmode;
  const isactive = user?.active.darkmode?._id ? true : false;

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState('');
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  const changeDakrmode = async () => {
    try {
      await Axios.post(`${serverHttp}`, null, {
        params: {
          dark: !dakrmode,
        },
        headers: {
          Authorization: token,
        },
      });
      dispatch(
        userLoginActions.setUser({
          user: {
            ...user,
            darkmode: !dakrmode,
          },
        }),
      );
    } catch (error) {
      if (!error.response) {
        setError('error occurred, please try again.');
        handleOpenSnackbar();
        return;
      }
      const {
        response: { status },
      } = error;
      if (status === 401) {
        setError('로그인 유효기간이 만료되었습니다. 다시 로그인해주세요.');
        setTimeout(() => goToLoginPage('/login'), 3100);
        handleOpenSnackbar();
      } else {
        setError('error occurred, please try again.');
        handleOpenSnackbar();
      }
    }
  };

  const handleChange = () => {
    changeDakrmode();
  };
  return (
    <>
      <div className={classes.root}>
        <span className={classes.text}>darkmode</span>
        {isactive ? (
          <Switch
            className={classes.switch}
            checked={user?.darkmode}
            onChange={handleChange}
            color="primary"
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        ) : (
          <Switch disabled className={classes.disableSwitch} />
        )}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Darkmode;
