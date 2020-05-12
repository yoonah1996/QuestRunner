/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import List from '@material-ui/core/List';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import QuestEntry from './QuestEntry';
import { RootState } from '../index';
import { serverHttp } from '../common/utils';
import { userLoginActions } from '../usersignin/userloginService';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    margin: theme.spacing(1),
    position: 'absolute',
    top: -50,
  },
  list: {
    position: 'absolute',
    top: 250,
  },
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 300,
  },
}));

export default function Quest() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [title, setTitle] = React.useState<string | null>('');
  const [content, setContent] = React.useState<string | null>('');
  const today = new Date();
  const accessToken = useSelector((state : RootState) => state.userLogin.accessToken);
  const quests = useSelector((state : RootState) => state.userLogin.user?.quests);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    today,
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToastClick = () => {
    setToast(true);
  };

  const handleToastClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setToast(false);
  };

  const handleAddQuest = () => {
    console.log(today);
    console.log(selectedDate);
    axios({
      method: 'post',
      url: `${serverHttp}/quest`,
      headers: {
        Authorization: accessToken,
      },
      data: {
        title,
        content,
        created_at: today,
        due_date: selectedDate,
      },
    })
      .then(() => {
        axios.get(`${serverHttp}/userinfo`, {
          headers: {
            Authorization: accessToken,
          },
        })
          .then((response) => {
            dispatch(userLoginActions.setUser({ user: response.data }));
            handleToastClick();
            handleClose();
          });
      })
      .catch((response) => {
        // handle error
        console.log(response);
      });
  };
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        ADD
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Quest Register</DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
          >
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                minDate={today}
                id="date-picker-inline"
                label="Due Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              id="outlined-multiline-static"
              label="Quest Content"
              multiline
              rows={6}
              variant="outlined"
              value={content}
              onChange={handleContentChange}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddQuest} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={toast} autoHideDuration={6000} onClose={handleToastClose}>
        <Alert onClose={handleToastClose} severity="success">
          퀘스트등록완료!
        </Alert>
      </Snackbar>
      <div className={classes.root}>
        <div className={classes.demo}>
          <List>
            {quests?.map((val) => (
              <div>
                <QuestEntry quest={val} />
                <Divider variant="inset" component="li" />
              </div>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}
