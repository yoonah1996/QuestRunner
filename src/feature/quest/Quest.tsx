/* eslint-disable function-paren-newline */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
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
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
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
import aeyong from '../../img/20200513_225601.jpg';
import { QuestItem } from '../common/interfaces';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    demo: (darkmode: any) => ({
      backgroundColor: darkmode.dark
        ? '#888888'
        : theme.palette.background.paper,
      color: darkmode.dark ? '#e0e0e0' : 'black',
    }),
    main: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 300,
    },
    dark: (darkmode: any) => ({
      backgroundColor: darkmode.dark
        ? '#888888'
        : theme.palette.background.paper,
      color: darkmode.dark ? '#e0e0e0' : 'black',
    }),
  }),
);

export default function Quest() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [title, setTitle] = React.useState<string | null>('');
  const [content, setContent] = React.useState<string | null>('');
  const today = new Date();
  const accessToken = useSelector(
    (state: RootState) => state.userLogin.accessToken,
  );
  // const [quests, setQuests] = React.useState<Array<QuestItem>>([]);
  const quests = useSelector(
    (state: RootState) => state.userLogin.user?.quests,
  );

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(today);

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
    setTitle('');
    setContent('');
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

  const dateFormatter = (date: Date | null) => {
    let resultString = '';
    let monthString = '';
    let dateString = '';
    resultString += date!.getFullYear().toString();
    const monthappender = date!.getMonth() + 1;
    monthString = monthappender.toString();
    if (monthString.length === 1) {
      monthString = `0${monthString}`;
    }
    resultString += monthString;
    dateString = date!.getDate().toString();
    if (dateString.length === 1) {
      dateString = `0${dateString}`;
    }
    resultString += dateString;
    return resultString;
  };
  const handleAddQuest = () => {
    const fixedToday = dateFormatter(today);
    const fixedSelectedDate = dateFormatter(selectedDate);
    axios({
      method: 'post',
      url: `${serverHttp}/quest`,
      headers: {
        Authorization: accessToken,
      },
      data: {
        title,
        content,
        created_at: fixedToday,
        due_date: fixedSelectedDate,
      },
    })
      .then(() => {
        axios
          .get(`${serverHttp}/userinfo`, {
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
  const dark = useSelector(
    (state: RootState) => state.userLogin.user?.darkmode,
  );
  const darkmode = {
    dark,
  };
  const classes = useStyles(darkmode);

  return (
    <div className={classes.main}>
      <Button
        variant="contained"
        color={dark ? 'primary' : 'secondary'}
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        ADD
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.dark}>
          Quest Register
        </DialogTitle>
        <DialogContent className={classes.dark}>
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
        <DialogActions className={classes.dark}>
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
      {quests!.length === 0 && (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="NO QUEST"
              height="100%"
              image={aeyong}
              title="NO QUEST"
            />
          </CardActionArea>
        </Card>
      )}
      {quests!.length > 0 && (
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
      )}
    </div>
  );
}
