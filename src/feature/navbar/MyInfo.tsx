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
import Image from '../../img/zolla.png';
import ImageUpload from './ImageUpload';

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
  const [open, setOpen] = React.useState(false);
  const [imgOpen, setImgOpen] = React.useState(false);

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

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={Image}
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
            Zolla
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Motto
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Carpediem
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Email
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Carpediem@test.com
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Credit
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            1500
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
              fullWidth
            />
            <TextField
              margin="dense"
              id="motto"
              label="Motto"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}
