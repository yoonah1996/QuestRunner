/* eslint-disable indent */
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
} from '@material-ui/core';
import TablePaginationActions from './TablePaginationActions';
import TableRowWithModal from './TableRowWithModal';
import EnhancedTableHead from './EnhancedTableHead';

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: 400,
    width: '100%',
    overflow: 'scrollY',
    // height: '80%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    boxShadow: theme.shadows[5],
  },
  body: {
    height: '50vh',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  pagination: {
    overflow: 'hidden',
  },
}));
interface IProps {
  quests: any;
}
function descendingComparator(a: any, b: any, orderBy: any) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order: string, orderBy: any) {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}
function stableSort(array: any[], comparator: Function) {
  const stabilizedThis = array ? array.map((el, index) => [el, index]) : [];
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const CustomPaginationActionsTable: React.FC<IProps> = ({ quests }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');
  const emptyRows = quests
    ? rowsPerPage - Math.min(rowsPerPage, quests!.length - page * rowsPerPage)
    : 5;
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
  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table stickyHeader aria-label="custom pagination table">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody className={classes.body}>
          {stableSort(quests, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((quest) => (
              <TableRowWithModal key={quest._id} quest={quest} />
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
              className={classes.pagination}
              rowsPerPageOptions={[5]}
              colSpan={3}
              count={quests ? quests!.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
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
