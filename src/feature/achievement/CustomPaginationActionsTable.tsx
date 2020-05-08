/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  TableHead,
} from '@material-ui/core';
import TablePaginationActions from './TablePaginationActions';
import { QuestItem } from '../common/interfaces';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  container: {
    maxWidth: 550,
    overflow: 'scrollY',
    height: '70%',
  },
  footer: {
    width: '100%',
  },
});

interface IProps {
  quests: QuestItem[] | undefined;
}

const columns = [
  { id: 'title', label: 'Title', minWidth: 125 },
  { id: 'contents', label: 'Contents', minWidth: 125 },
  {
    id: 'dueDate',
    label: 'Due Date',
    minWidth: 125,
  },
  {
    id: 'completed',
    label: 'Completed',
    minWidth: 125,
  },
];

const CustomPaginationActionsTable: React.FC<IProps> = ({ quests }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, quests!.length - page * rowsPerPage);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.currentTarget.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table
        className={classes.table}
        stickyHeader
        aria-label="custom pagination table"
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align="center">
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? quests!.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
              )
            : quests!
          ).map((quest) => (
            <TableRow key={quest._id}>
              <TableCell component="th" scope="row" align="center">
                {quest.title}
              </TableCell>
              <TableCell style={{ width: 150 }} align="center">
                {quest.contents}
              </TableCell>
              <TableCell style={{ width: 150 }} align="center">
                {quest.due_date}
              </TableCell>
              <TableCell style={{ width: 150 }} align="center">
                {quest.completed ? 'Yes' : 'No'}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              className={classes.footer}
              rowsPerPageOptions={[5, 10]}
              colSpan={3}
              count={quests!.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': '' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default CustomPaginationActionsTable;
