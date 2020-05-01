/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Modal,
  Fade,
  Button,
} from '@material-ui/core';

interface Item {
  feature: string;
  _id: string;
  image: string;
  price: number;
  item_name: string;
}

interface IProp {
  item: Item;
  category: string;
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
const Item: React.FC<IProp> = ({ item, category }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [target, setTarget] = useState<string | null>('');
  const handleOpen = (targetItem: string | null) => {
    setTarget(targetItem);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetItem = e.currentTarget.childNodes[1].textContent;
    handleOpen(targetItem);
  };
  const handlePurchase = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { id },
    } = e;
    if (id === 'purchase') {
      // 현재 가지고 있는 credit 보다 적으면 못삼
      console.log('구매?');
    } else {
      handleClose();
    }
  };
  return (
    <div className={classes.main}>
      <Card className={classes.root}>
        <CardActionArea onClick={onClick}>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/paella.jpg"
            // title="Contemplative Reptile"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.item_name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        className={classes.modal}
      >
        <Fade in={open}>
          <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">{category}</h3>
            <p id="simple-modal-description">{target}</p>
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
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Item;
