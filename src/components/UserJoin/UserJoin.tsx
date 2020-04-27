/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { RouteComponentProps } from 'react-router-dom';
import ValidText from './ValidText';
import { emailRegex, initToUpper } from '../../utils';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserJoin: React.FC<RouteComponentProps> = ({ history: { push } }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassrowdError, setConfirmPasswordError] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(false);

  const checkValidate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, id },
    } = e;
    // check email validation
    if (id === 'email') {
      const isValidEmail = emailRegex.test(value);
      if (value.length === 0) {
        setEmailError('');
        setEmailValid(true);
        return;
      }
      if (isValidEmail) {
        setEmailError('');
        setEmailValid(true);
      } else {
        setEmailError('email is not valid');
        setEmailValid(false);
      }
    } else if (id === 'password') {
      // passwordValidation
      if (value.length === 0) {
        setPasswordError('');
        setPasswordValid(true);
        return;
      }
      if (value.length < 6) {
        setPasswordError('password is at leaset 6 characters');
        setPasswordValid(false);
      } else {
        setPasswordError('');
        setPasswordValid(true);
      }
    } else if (id === 'password2') {
      if (value.length === 0) {
        setConfirmPasswordError('');
        setIsPasswordSame(true);
        return;
      }
      if (value !== password) {
        setConfirmPasswordError('not same password');
        setIsPasswordSame(false);
      } else {
        setIsPasswordSame(true);
      }
    }
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

  const onSubmit = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    console.log(email, password, username);
    // TODO : send request
    // 200 => rediect to sign in
    push('/userLoginPage');
    // 400 => userid duplicate or else
    // 500 => internal error try again
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
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
              {!emailValid ? <ValidText error={emailError} /> : null}
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
              {!passwordValid ? <ValidText error={passwordError} /> : null}
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
              {!isPasswordSame ? (
                <ValidText error={confirmPassrowdError} />
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
      </div>
    </Container>
  );
};

export default UserJoin;
