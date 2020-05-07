import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
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

export default function QuestEntry() {
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar>
          <KeyboardArrowDownIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Single-line item"
        secondary="Secondary text"
      />
      <ListItemSecondaryAction>
        <Checkbox
          edge="end"
        />
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete">
          <ConfirmationNumberIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
