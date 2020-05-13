/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable key-spacing */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Modal,
  Button,
  Fade,
  Snackbar,
} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '..';
import { serverHttp } from '../common/utils';
import { userLoginActions } from '../usersignin/userloginService';

interface Item {
  _id: string;
  image: string;
  price: number;
  item_name: string;
  category: any;
}
interface IProp {
  item: Item;
  state: string;
  goToLoginPage: Function;
}
function Alert(props: AlertProps) {
  return <MuiAlert elevation={3} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  main: {
    padding: 5,
  },
  root: {
    width: 100,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop: '30',
  },
  paper: {
    position: 'absolute',
    width: 200,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: 'center',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    padding: 0,
    marging: 0,
    textAlign: 'center',
  },
}));
const getModalStyle = () => {
  const top = 50;
  const left = 50;
  return {
    outline: 'none',
    backgroundColor: 'black',
    color: 'white',
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};
const Item: React.FC<IProp> = ({ item, state, goToLoginPage }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.userLogin.accessToken);
  const user = useSelector((state: RootState) => state.userLogin.user);

  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [target, setTarget] = useState<string | null>('');
  const [isCreditEnough, setIsCreditEnough] = useState(false);
  const [isAdapt, setIsAdapt] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpen = (targetItem: string | null) => {
    setTarget(targetItem);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsAdapt(false);
  };
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetItem = e.currentTarget.childNodes[1].textContent;
    handleOpen(targetItem);
  };
  const PurchaseItem = async () => {
    try {
      await axios.post(`${serverHttp}/items/purchase`, null, {
        params: {
          id: item._id,
        },
        headers: {
          Authorization: token,
        },
      });
      dispatch(
        userLoginActions.setUser({
          user: {
            ...user,
            items: {
              ...user?.items,
              [item.category]: [...user?.items[item.category], item],
            },
          },
        }),
      );
    } catch (error) {
      const {
        response: { status },
      } = error;
      if (status === 401) {
        setError('로그인 유효기간이 만료되었습니다. 다시 로그인해주세요.');
        handleOpenSnackbar();
        setTimeout(() => goToLoginPage(), 3100);
      } else {
        setError('error occurred, please try again.');
        handleOpenSnackbar();
      }
    } finally {
      setIsAdapt(false);
    }
  };
  const activeItem = async () => {
    try {
      await axios.post(`${serverHttp}/items/active`, null, {
        params: {
          id: item._id,
        },
        headers: {
          Authorization: token,
        },
      });
      dispatch(
        userLoginActions.setUser({
          user: {
            ...user,
            active: {
              ...user?.active,
              [item.category]: item,
            },
          },
        }),
      );
    } catch (error) {
      if (!error.response) {
        setError('error occurred');
        setOpenSnackbar(true);
        return;
      }
      const {
        response: { status },
      } = error;
      if (status === 401) {
        setError('로그인 유효기간이 만료되었습니다. 다시 로그인해주세요.');
        setOpenSnackbar(true);
        setTimeout(() => goToLoginPage(), 3100);
      } else {
        setError('error occurred, please try again.');
        setOpenSnackbar(true);
      }
    } finally {
      setIsAdapt(false);
    }
  };
  const handlePurchase = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { id },
    } = e;
    if (id === 'purchase') {
      if (item.price > user!.credits) {
        setIsCreditEnough(true);
        setTimeout(() => {
          setIsCreditEnough(false);
        }, 2500);
        return;
      }
      PurchaseItem();
    }
    handleClose();
  };
  const adaptItem = () => {
    activeItem();
  };
  const openAdaptModal = () => setIsAdapt(true);
  return (
    <>
      <div className={classes.main}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/paella.jpg"
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="body2" color="textSecondary" component="h5">
              {item.item_name}
            </Typography>
            {state === 'active' ? (
              <Button type="button" variant="contained" disabled>
                적용됨
              </Button>
            ) : state === 'purchased' ? (
              <Button
                type="button"
                variant="contained"
                color="secondary"
                onClick={openAdaptModal}
              >
                구매함
              </Button>
            ) : (
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={onClick}
              >
                구매가능
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isAdapt}
        onClose={handleClose}
        className={classes.modal}
      >
        <Fade in={isAdapt}>
          <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">{item.category}</h3>
            <p id="simple-modal-description">{item.item_name}</p>
            <p>적용하시겠습니까?</p>
            <Button color="primary" id="adaptItem" onClick={adaptItem}>
              Yes
            </Button>
            <Button color="secondary" id="cancel" onClick={handleClose}>
              No
            </Button>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        className={classes.modal}
      >
        <div style={modalStyle} className={classes.paper}>
          <h3 id="simple-modal-title">{item.category}</h3>
          <p id="simple-modal-description">{item.item_name}</p>
          <h5>
            <span>price : </span>
            {item.price}
          </h5>
          <p>구매 하시겠습니까?</p>
          <Button color="primary" id="purchase" onClick={handlePurchase}>
            Yes
          </Button>
          <Button color="secondary" id="cancel" onClick={handlePurchase}>
            No
          </Button>
          {isCreditEnough ? <div>not enough credit</div> : null}
        </div>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Item;
