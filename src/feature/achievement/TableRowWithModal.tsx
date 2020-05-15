/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable radix */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable-next-line object-curly-newline */
import React, { useState } from 'react';
import {
  TableRow,
  TableCell,
  Modal,
  makeStyles,
  Fade,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import Text from './Text';
import { RootState } from '..';

const getModalStyle = () => {
  const top = 50;
  const left = 50;
  return {
    outline: 'none',
    backgroundColor: 'black',
    borderRadius: '5px',
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
  },
  row: (darkmode: any) => ({
    backgroundColor: darkmode.dark
      ? 'rgba(136,136,136,0.5)'
      : 'rgba(241,227,203,0.5)',
    transition: 'background-color .5s',
    '&:hover': {
      backgroundColor: darkmode.dark
        ? 'rgba(136,136,136,0.9)'
        : 'rgba(241,227,203,0.7)',
    },
  }),
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
    textAlign: 'center',
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
  cell: (darkmode: any) => ({
    color: darkmode.dark ? '#e0e0e0' : 'black',
  }),
}));

interface IProps {
  quest: any;
}

const TableRowWithModal: React.FC<IProps> = ({ quest }) => {
  const [open, setOpen] = useState(false);
  const dark = useSelector(
    (state: RootState) => state.userLogin.user?.darkmode,
  );
  const darkmode = {
    dark,
  };
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles(darkmode);
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
        <TableCell
          component="th"
          scope="row"
          align="center"
          padding="none"
          className={classes.cell}
        >
          {quest.title.length > 10
            ? `${quest.contents.substring(0, 10)}...`
            : quest.title}
        </TableCell>
        <TableCell
          style={{ width: 150 }}
          align="center"
          className={classes.cell}
        >
          {quest.contents.length > 10
            ? `${quest.contents.substring(0, 10)}...`
            : quest.contents}
        </TableCell>
        <TableCell
          style={{ width: 150 }}
          align="center"
          className={classes.cell}
        >
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
          <div className={classes.paper} style={modalStyle}>
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
