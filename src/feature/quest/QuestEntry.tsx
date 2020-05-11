/* eslint-disable camelcase */
import React from 'react';
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
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DetailsIcon from '@material-ui/icons/Details';
import Typography from '@material-ui/core/Typography';
import { QuestItem } from '../common/interfaces';

interface IProps {
  quest: QuestItem | null
}


export default function QuestEntry({ quest } : IProps) {
  const [checked, setChecked] = React.useState(quest?.checked);
  const [questopen, setQuestOpen] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleClickOpen = () => {
    setQuestOpen(true);
  };

  const handleClose = () => {
    console.log("click");
    setQuestOpen(false);
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
        <IconButton edge="end" aria-label="delete">
          <ConfirmationNumberIcon />
        </IconButton>
        )}
        {!checked && (
        <IconButton edge="end" aria-label="delete">
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
