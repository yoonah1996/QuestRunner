/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DetailsIcon from '@material-ui/icons/Details';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { QuestItem } from '../common/interfaces';
import { RootState } from '../index';
import { serverHttp } from '../common/utils';
import { userLoginActions } from '../usersignin/userloginService';

interface IProps {
  quest: QuestItem;
}


export default function QuestEntry({ quest } : IProps) {
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(quest?.checked);
  console.log(checked);
  const [questopen, setQuestOpen] = React.useState(false);
  const accessToken = useSelector((state : RootState) => state.userLogin.accessToken);
  const [btnDis, setDis] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    axios({
      method: 'patch',
      url: `${serverHttp}/quest`,
      headers: {
        Authorization: accessToken,
      },
      params: {
        id: quest?._id,
        checked: event.target.checked,
        finalize: false,
      },
    })
      .then((res) => {
        axios.get(`${serverHttp}/userinfo`, {
          headers: {
            Authorization: accessToken,
          },
        })
          .then((response) => {
            dispatch(userLoginActions.setUser({ user: response.data }));
          });
      });
  };


  const handleClickOpen = () => {
    setQuestOpen(true);
  };

  const handleClose = () => {
    setQuestOpen(false);
  };

  const handleConfirm = () => {
    setDis(true);
    axios({
      method: 'patch',
      url: `${serverHttp}/quest`,
      headers: {
        Authorization: accessToken,
      },
      params: {
        id: quest?._id,
        checked: true,
        finalize: true,
      },
    })
      .then((res) => {
        axios.get(`${serverHttp}/userinfo`, {
          headers: {
            Authorization: accessToken,
          },
        })
          .then((response) => {
            dispatch(userLoginActions.setUser({ user: response.data }));
            setDis(false);
          });
      });
  };

  const handleDelete = () => {
    axios({
      method: 'delete',
      url: `${serverHttp}/quest`,
      headers: {
        Authorization: accessToken,
      },
      params: {
        id: quest?._id,
      },
    })
      .then((res) => {
        axios.get(`${serverHttp}/userinfo`, {
          headers: {
            Authorization: accessToken,
          },
        })
          .then((response) => {
            dispatch(userLoginActions.setUser({ user: response.data }));
          });
      });
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar onClick={handleClickOpen}>
          <DetailsIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={quest?.title}
      />
      <ListItemSecondaryAction>
        <Checkbox
          edge="end"
          checked={checked}
          onChange={handleChange}
        />
        {checked && (
        <IconButton disabled={btnDis} edge="end" aria-label="delete" onClick={handleConfirm}>
          <DoneAllIcon />
        </IconButton>
        )}
        {!checked && (
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
        )}
      </ListItemSecondaryAction>
      <Dialog open={questopen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{quest?.title}</DialogTitle>
        <DialogContent>
          <Typography gutterBottom variant="h5" component="h2">
            Created Date
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {quest?.created_at}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Due Date
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {quest?.due_date}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Content
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {quest?.contents}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
}
