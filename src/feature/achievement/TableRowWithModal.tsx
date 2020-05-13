/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable radix */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// eslint-disable-next-line object-curly-newline
import {
  TableRow,
  TableCell,
  Modal,
  makeStyles,
  Fade,
} from '@material-ui/core';
import Text from './Text';

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

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
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
    borderRadius: '5px',
  },
  row: {
    transition: 'background-color .5s',
    '&:hover': {
      backgroundColor: 'rgba(241,227,203,0.5)',
    },
  },
  ul: {
    listStyle: 'none',
    textAlign: 'center',
    padding: '0px',
    margin: '0px',
  },
  subInfo: {
    textAlign: 'right',
    fontSize: '8px',
    marginTop: '3px',
  },
  mainInfo: {
    border: '1px solid white',
    borderRadius: '5px',
    padding: '10px',
  },
}));

interface IProps {
  quest: any;
}

const TableRowWithModal: React.FC<IProps> = ({ quest }) => {
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  const subStringDate = (start: number, end: number) =>
    String(quest.due_date).substring(start, end);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <TableRow
        key={quest._id}
        onClick={handleOpen}
        className={classes.row}
        tabIndex={-1}
      >
        <TableCell component="th" scope="row" align="center" padding="none">
          {quest.title.length > 10
            ? `${quest.contents.substring(0, 10)}...`
            : quest.title}
        </TableCell>
        <TableCell style={{ width: 150 }} align="center">
          {quest.contents.length > 10
            ? `${quest.contents.substring(0, 10)}...`
            : quest.contents}
        </TableCell>
        <TableCell style={{ width: 150 }} align="center">
          {`${subStringDate(0, 4)}/${subStringDate(4, 6)}/${subStringDate(
            6,
            8,
          )}`}
        </TableCell>
        <TableCell style={{ width: 150 }} align="center">
          {quest.checked ? (
            <Text text="Yes" color="blue" />
          ) : (
            <Text text="No" color="red" />
          )}
        </TableCell>
      </TableRow>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        className={classes.modal}
      >
        <Fade in={open}>
          <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">{quest.title}</h3>
            <ul className={classes.ul}>
              <li className={classes.mainInfo}>
                <div id="simple-modal-description">{quest.contents}</div>
              </li>
              <li className={classes.subInfo}>
                <div>
                  {`Due Date : ${subStringDate(0, 8)} / Completed : ${
                    quest.completed ? 'Yes' : 'No'
                  }`}
                </div>
              </li>
            </ul>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default TableRowWithModal;
