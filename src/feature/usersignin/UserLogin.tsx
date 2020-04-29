/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// eslint-disable-next-line no-unused-vars
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Image from '../../img/penmon.jpg';
import { RootState } from '..';
import { userLoginActions } from './userloginService';

const axios = require('axios');
// const httpRes = axios.create({
//   baseURL: 'http://61.75.4.217/userinfo',
//   header: {

//   }
// })

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    // margin: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: '100%',
    height: '100%',
    padding: '10%',
  },
  drawerPaper: {
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundImage: `url(${Image})`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  signUp: {
    marginTop: '10px',
  },
  signUpButton: {
    color: 'rgba(70,70,70,0.9)',
  },
}));

const UserLogin: React.FC<RouteComponentProps> = ({ history: { push } }) => {
  // const dispatch = useDispatch();
  // dispatch(actions.setLogin({ isLogin: true, token:  }));
  const classes = useStyles();
  const [form, setValues] = useState({
    email: '',
    password: '',
  });

  const changeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...form, [e.target.id]: e.target.value });
  };

  const submitClick = (e: React.FormEvent<Element>) => {
    console.log(form);
  };

  return (
    <div className={classes.drawerPaper}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Quest Runner
          </Typography>
          <form className={classes.form} noValidate onSubmit={submitClick}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              // autoComplete="email"
              autoFocus
              onChange={changeUser}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              onChange={changeUser}
            />
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              // color="text.disabled"
              onClick={async () => {
                axios
                  .post('http://61.75.4.217/userinfo', {
                    body: form,
                  })
                  .then((response: string) => {
                    console.log(response);
                  })
                  .catch((error: string) => {
                    console.log(error);
                  });
              }}
            >
              Sign In
            </Button>
            <Grid className={classes.signUp} container>
              <Grid item xs />
              <Grid item>
                <Button
                  className={classes.signUpButton}
                  onClick={() => {
                    push('/userJoinPage');
                  }}
                >
                  Don't have an account? Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default UserLogin;
