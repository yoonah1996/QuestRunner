/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Snackbar,
} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
interface Response {
  message: string;
}
function Alert(props: AlertProps) {
  return <MuiAlert elevation={3} variant="filled" {...props} />;
}
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
    usernameValid: false,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
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
  const validAlert = (message: string) => {
    setError({
      ...error,
      requiredError: message,
    });
    setTimeout(() => {
      setError({
        ...error,
        requiredError: '',
      });
    }, 3000);
  };
  const onSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    if (
      !isvalid.emailValid ||
      !isvalid.passwordValid ||
      !isvalid.password2Valid
    ) {
      validAlert('please fill this form');
      return null;
    }
    if (username === '') {
      validAlert('please fill username');
      return null;
    }
    try {
      await axios.post<Response>(`${serverHttp}/user`, {
        email,
        password,
        username,
      });
      push('/login');
    } catch (error) {
      if (!error.response) {
        handleOpenSnackbar();
        return null;
      }
      const {
        response: {
          data: { message },
        },
      } = error;
      validAlert(message);
    }
  };
  const classes = useStyles();
  return (
    <>
      <div className={classes.bg}>
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
                  ) : null}
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
              push('/login');
            }}
          >
            go to SignIn
          </Button>
        </Container>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          error occuerd, please try again.
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserJoin;
