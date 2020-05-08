/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import ImageUpload from './ImageUpload';
import { RootState } from '../index';
import { serverHttp } from '../common/utils';
import { userLoginActions } from '../usersignin/userloginService';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [imgOpen, setImgOpen] = React.useState(false);

  const imageSrc = useSelector((state : RootState) => state.userLogin.user?.profilePic);
  const userName = useSelector((state : RootState) => state.userLogin.user?.username);
  const motto = useSelector((state : RootState) => state.userLogin.user?.motto);
  const noMotto = '설정된 좌우명이 없습니다.';
  const uEmail = useSelector((state : RootState) => state.userLogin.user?.email);
  const credits = useSelector((state : RootState) => state.userLogin.user?.credits);
  const token = useSelector((state:RootState) => state.userLogin.accessToken);

  const [usernameEdit, setUsernameEdit] = React.useState(userName);
  const [mottoEdit, setMottoEdit] = React.useState(motto);


  const [diaOpen, setDiaOpen] = React.useState(false);

  const handleDiaClick = () => {
    setDiaOpen(true);
  };

  const handleDiaClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setDiaOpen(false);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameEdit(event.target.value);
  };

  const handleMottoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMottoEdit(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const imageClickOpen = () => {
    setImgOpen(true);
  };

  const imageClose = () => {
    setImgOpen(false);
  };

  const handleEditInfo = () => {
    axios({
      method: 'patch',
      url: `${serverHttp}/user`,
      headers: {
        Authorization: token,
      },
      data: {
        motto: mottoEdit,
        username: usernameEdit,
      },
    }).then(() => {
      axios.get(`${serverHttp}/userinfo`, {
        headers: {
          Authorization: token,
        },
      })
        .then((response) => dispatch(userLoginActions.setUser({ user: response.data })))
        .then(() => {
          handleClose();
          handleDiaClick();
        });
    })
      .catch((response) => {
      // handle error
        console.log(response);
      });
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageSrc}
          title="Contemplative Reptile"
          onClick={imageClickOpen}
        />
        <Dialog
          open={imgOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Want to change your avatar?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              설정할 이미지를 선택 & 업로드 후 닫으세요
            </DialogContentText>
            <ImageUpload />
          </DialogContent>
          <DialogActions>
            <Button onClick={imageClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <CardContent>
          <Typography gutterBottom variant="h3" component="h2">
            {userName}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Motto
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {motto === '' ? noMotto : motto}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Email
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {uEmail}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Credit
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {credits}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleClickOpen}>
          Edit Info
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Info</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="text"
              value={usernameEdit}
              onChange={handleUsernameChange}
              fullWidth
            />
            <TextField
              margin="dense"
              id="motto"
              label="Motto"
              type="text"
              value={mottoEdit}
              onChange={handleMottoChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditInfo} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={diaOpen} autoHideDuration={6000} onClose={handleDiaClose}>
          <Alert onClose={handleDiaClose} severity="success">
            정보변경완료!
          </Alert>
        </Snackbar>
      </CardActions>
    </Card>
  );
}
