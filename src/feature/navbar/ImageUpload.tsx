/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { serverHttp } from '../common/utils';
import { RootState } from '../index';


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ImageUpload() {
  const [selectedFile, setSelectedFile] = React.useState<File | string>('fileurl');
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | null>();
  const token = useSelector((state: RootState) => state.userLogin.accessToken);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const fileChangedHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files![0]!);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result?.toString());
    };

    reader.readAsDataURL(e.target.files![0]!);
  };

  const submit = () => {
    const fd = new FormData();
    fd.append('avatar', selectedFile);
    axios({
      method: 'post',
      url: `${serverHttp}/avatar`,
      data: fd,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        handleClick();
      })
      .catch((response) => {
        // handle error
        console.log(response);
      });
  };

  let imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
  if (imagePreviewUrl) {
    imagePreview = (
      <div className="image-container">
        <img src={imagePreviewUrl} alt="icon" width="200" />
        {' '}
      </div>
    );
  }

  return (
    <div className="App">
      <input type="file" name="avatar" onChange={fileChangedHandler} />
      <button type="button" onClick={submit}> Upload </button>
      { imagePreview }
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          사진변경완료!
        </Alert>
      </Snackbar>
    </div>
  );
}
