/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Fade,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { ArrowBackIos } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// eslint-disable-next-line no-unused-vars
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import ValidText from './ValidText';
import { emailRegex, initToUpper, serverHttp } from '../common/utils';
import Image from '../../img/penmon.jpg';

axios.defaults.withCredentials = true;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.light,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  bg: {
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundImage: `url(${Image})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  signInButton: {
    color: 'rgba(70,70,70,0.9)',
  },
}));

const UserJoin: React.FC<RouteComponentProps> = ({ history: { push } }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    emailError: '',
    passwordError: '',
    confirmPassrowdError: '',
    requiredError: '',
  });
  const [isvalid, setIsValid] = useState({
    passwordValid: false,
    emailValid: false,
    password2Valid: false,
  });
  const checkEamil = (value: string, id: string) => {
    if (id === 'email') {
      const isValidEmail = emailRegex.test(value);
      if (value.length === 0) {
        setError({
          ...error,
          emailError: '',
        });
        setIsValid({
          ...isvalid,
          emailValid: true,
        });
        return;
      }
      if (isValidEmail) {
        setError({
          ...error,
          emailError: '',
        });
        setIsValid({
          ...isvalid,
          emailValid: true,
        });
      } else {
        setError({
          ...error,
          emailError: 'email is not valid',
        });
        setIsValid({
          ...isvalid,
          emailValid: false,
        });
      }
    }
  };
  const checkPassword = (value: string, id: string) => {
    if (id === 'password') {
      if (value.length === 0) {
        setError({
          ...error,
          passwordError: '',
        });
        setIsValid({
          ...isvalid,
          passwordValid: true,
        });
        return;
      }
      if (value.length < 6) {
        setError({
          ...error,
          passwordError: 'password is at leaset 6 characters',
        });
        setIsValid({
          ...isvalid,
          passwordValid: false,
        });
      } else {
        setError({
          ...error,
          passwordError: '',
        });
        setIsValid({
          ...isvalid,
          passwordValid: true,
        });
      }
    }
  };
  const checkPassword2 = (value: string, id: string) => {
    if (id === 'password2') {
      if (value.length === 0) {
        setError({
          ...error,
          confirmPassrowdError: '',
        });
        setIsValid({
          ...isvalid,
          password2Valid: true,
        });
        return;
      }
      if (value !== password) {
        setError({
          ...error,
          confirmPassrowdError: 'not same password',
        });
        setIsValid({
          ...isvalid,
          password2Valid: false,
        });
      } else {
        setIsValid({
          ...isvalid,
          password2Valid: true,
        });
      }
    }
  };
  const checkValidate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, id },
    } = e;
    checkEamil(value, id);
    checkPassword(value, id);
    checkPassword2(value, id);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const setName = `set${initToUpper(e.target.id)}`;
    const {
      target: { value },
    } = e;
    switch (setName) {
      case 'setEmail':
        checkValidate(e);
        setEmail(value);
        break;
      case 'setUsername':
        setUsername(value);
        break;
      case 'setPassword':
        checkValidate(e);
        setPassword(value);
        break;
      default:
        break;
    }
  };
  interface Response {
    message: string;
  }

  const onSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    if (
      !isvalid.emailValid ||
      !isvalid.passwordValid ||
      !isvalid.password2Valid
    ) {
      setError({
        ...error,
        requiredError: 'please fill this form',
      });
      setTimeout(() => {
        setError({
          ...error,
          requiredError: '',
        });
      }, 3000);
      return null;
    }
    try {
      const res = await axios.post<Response>(`${serverHttp}/user`, {
        email,
        password,
        username,
      });
      console.log(res);
      const resMessage = res.data.message;
      switch (resMessage) {
        case 'successfully added':
          push('/userLoginPage');
          break;
        case 'user already exists':
          setError({
            ...error,
            requiredError: 'user already exists!',
          });
          setTimeout(() => {
            setError({
              ...error,
              requiredError: '',
            });
          }, 3000);
          break;
        default:
          setError({
            ...error,
            requiredError: 'user already exists!',
          });
          setTimeout(() => {
            setError({
              ...error,
              requiredError: 'error occured, please try again',
            });
          }, 3000);
          break;
      }
      // eslint-disable-next-line no-shadow
    } catch (error) {
      console.log(error);
    }
    // console.log(email, password, username);
    // TODO : send request
    // 200 => rediect to sign in
    // 400 => userid duplicate or else
    // 500 => internal error try again
  };

  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <Fade in>
        <Container className={classes.container} component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="off"
                    onChange={onChange}
                  />
                  {!isvalid.emailValid ? (
                    <ValidText error={error.emailError} />
                  ) : true}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="uarname"
                    autoComplete="off"
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={onChange}
                  />
                  {!isvalid.passwordValid ? (
                    <ValidText error={error.passwordError} />
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password2"
                    label="Confirm Password"
                    type="password"
                    id="password2"
                    autoComplete="confirm-password"
                    onChange={checkValidate}
                  />
                  {!isvalid.password2Valid ? (
                    <ValidText error={error.confirmPassrowdError} />
                  ) : null}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </form>
            <ValidText error={error.requiredError} />
          </div>
          <Button
            className={classes.signInButton}
            onClick={() => {
              push('/userLoginPage');
            }}
          >
            go to SignIn
          </Button>
        </Container>
      </Fade>
    </div>
  );
};

export default UserJoin;
