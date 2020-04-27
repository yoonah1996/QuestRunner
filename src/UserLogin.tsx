import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from 'react-redux';
// import Image from './penmon.jpg';
import { RootState } from './store/modules';
import { actions } from './store/modules/userLogin';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    // margin: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    padding: '10%',
  },
  drawerPaper: {
    // backgroundSize: 'cover',
    // backgroundImage: `url(${Image})`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const UserLogin: React.FC = () => {
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

  return (
    <div className={classes.drawerPaper}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Quest Runner
          </Typography>
          <form className={classes.form} noValidate>
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
              className="loginBt"
              onClick={() => {
                console.log(form.email, form.password);
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs />
              <Grid item>
                {/* <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default UserLogin;
