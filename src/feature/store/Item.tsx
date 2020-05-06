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
} from '@material-ui/core';
import axios from 'axios';
import { serverHttp } from '../common/utils';

interface Item {
  _id: string;
  image: string;
  price: number;
  item_name: string;
  category: string;
}
interface IProp {
  item: Item;
  state: string;
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
// dummyData
const userCredit = {
  credit: 50000,
};

const Item: React.FC<IProp> = ({ item, state }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [target, setTarget] = useState<string | null>('');
  const [isCreditEnough, setIsCreditEnough] = useState(false);
  const [isAdapt, setIsAdapt] = useState(false);
  const handleOpen = (targetItem: string | null) => {
    setTarget(targetItem);
    setOpen(true);
  };
  const openAdaptModal = () => setIsAdapt(true);
  const handleClose = () => {
    setOpen(false);
    setIsAdapt(false);
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
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZWFkODQxOTAxYmE0NjI3MjM3YTkzM2UiLCJpYXQiOjE1ODg3MzY3MTksImV4cCI6MTU4ODc0MDMxOX0.CJACwmgsu8HjUUbHslnxasYnyGlEK8YgzhO9OUkCUVc',
        },
      });
    } catch (error) {
      // error component로 랜더?
      console.error(error);
    }
  };
  const handlePurchase = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { id },
    } = e;
    if (id === 'purchase') {
      if (item.price > userCredit.credit) {
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
  const activeItem = async () => {
    try {
      await axios.post(`${serverHttp}/items/active`, null, {
        params: {
          id: item._id,
        },
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZWFkODQxOTAxYmE0NjI3MjM3YTkzM2UiLCJpYXQiOjE1ODg3MzY3MTksImV4cCI6MTU4ODc0MDMxOX0.CJACwmgsu8HjUUbHslnxasYnyGlEK8YgzhO9OUkCUVc',
        },
      });
    } catch (error) {
      // error component로 랜더?
      console.error(error);
    } finally {
      setIsAdapt(false);
    }
  };
  const adaptItem = () => {
    activeItem();
  };
  return (
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
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isAdapt}
        onClose={handleClose}
        className={classes.modal}
      >
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
    </div>
  );
};

export default Item;
