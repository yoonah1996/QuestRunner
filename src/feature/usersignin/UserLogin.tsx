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
import axios from 'axios';
import Image from '../../img/penmon.jpg';
import { RootState } from '..';
import { userLoginActions } from './userloginService';
import { emailRegex, serverHttp } from '../common/utils';
import ValidText from '../userjoin/ValidText';

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
  const dispatch = useDispatch();
  const classes = useStyles();
  const [form, setValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    emailError: '',
    clickError: '',
  });

  const changeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...form, [e.target.id]: e.target.value });
    const isValidEmail = emailRegex.test(form.email);
    if (!isValidEmail) {
      setError({
        ...error,
        emailError: 'email is not valid',
      });
    } else {
      setError({
        ...error,
        emailError: '',
      });
    }
  };

  // interface Tokens {
  //   accessToken: string;
  //   refreshToken: string;
  // }

  // interface Datas {
  //   data: Tokens | null
  // }

  const submitClick = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    // eslint-disable-next-line no-empty
    if (form.email.length === 0 || form.password.length === 0 || error.emailError.length !== 0) {
      setError({
        ...error,
        clickError: 'please fill this form',
      });
    } else {
      axios
        .post(`${serverHttp}/userinfo`, {    //userlogin
          email: form.email,
          password: form.password,
        })
        .then((response) => {
          const state: number = response.status;
          switch (state) {
            case 200:
              console.log(response);
              dispatch(userLoginActions.setLogin({ isLogin: true, token: response.data })); //  token 저장
              break;
            default:
              break;
          }
        })
        .catch((err) => {
          setError({
            ...error,
            clickError: 'please fill this form',
          });
        });
    }
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                onChange={changeUser}
              />
              <ValidText error={error.emailError} />
            </Grid>
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
              type="submit"
              fullWidth
              variant="contained"
            // color="text.disabled"
            >
              Sign In
            </Button>
            <ValidText error={error.clickError} />
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
