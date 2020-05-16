/* eslint-disable function-paren-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable radix */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable-next-line object-curly-newline */
import React, { useState, useRef } from 'react';
import {
  TableRow,
  TableCell,
  Modal,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import Text from './Text';
import { RootState } from '..';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      transform: 'translateZ(0)',
      '@media all and (-ms-high-contrast: none)': {
        display: 'none',
      },
    },
    paper: (darkmode: any) => ({
      position: 'absolute',
      width: 400,
      backgroundColor: darkmode.dark
        ? '#888888'
        : theme.palette.background.paper,
      color: darkmode.dark ? '#e0e0e0' : 'black',
      borderRadius: '5px',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      outlineStyle: 'none',
    }),
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
    ul: (darkmode: any) => ({
      listStyle: 'none',
      textAlign: 'center',
      padding: '0px',
      margin: '0px',
      backgroundColor: darkmode.dark
        ? '#888888'
        : theme.palette.background.paper,
      color: darkmode.dark ? '#e0e0e0' : 'black',
    }),
    subInfo: (darkmode: any) => ({
      textAlign: 'right',
      fontSize: '8px',
      margin: '10px 0px',
      backgroundColor: darkmode.dark
        ? '#888888'
        : theme.palette.background.paper,
      color: darkmode.dark ? '#e0e0e0' : 'black',
    }),
    mainInfo: (darkmode: any) => ({
      border: darkmode.dark ? '1px solid white' : '1px solid #888888',
      padding: '10px 0',
      backgroundColor: darkmode.dark
        ? '#888888'
        : theme.palette.background.paper,
      color: darkmode.dark ? '#e0e0e0' : 'black',
    }),
    cell: (darkmode: any) => ({
      color: darkmode.dark ? '#e0e0e0' : 'black',
    }),
    dark: (darkmode: any) => ({
      backgroundColor: darkmode.dark
        ? '#888888'
        : theme.palette.background.paper,
      color: darkmode.dark ? '#e0e0e0' : 'black',
    }),
  }),
);

interface IProps {
  quest: any;
}

const TableRowWithModal: React.FC<IProps> = ({ quest }) => {
  const [open, setOpen] = useState(false);

  const rootRef = useRef(null);
  const dark = useSelector(
    (state: RootState) => state.userLogin.user?.darkmode,
  );
  const darkmode = {
    dark,
  };
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
      <div className={classes.root}>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
          className={classes.modal}
          container={() => rootRef.current}
        >
          <div className={classes.paper}>
            <h3 id="simple-modal-title" className={classes.dark}>
              {quest.title}
            </h3>
            <ul className={classes.ul}>
              <li className={classes.mainInfo}>
                <div id="simple-modal-description" className={classes.dark}>
                  {quest.contents}
                </div>
              </li>
              <li className={classes.subInfo}>
                <div className={classes.dark}>
                  {`Due Date : ${subStringDate(0, 8)} / Completed : ${
                    quest.checked ? 'Yes' : 'No'
                  }`}
                </div>
              </li>
            </ul>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default TableRowWithModal;
