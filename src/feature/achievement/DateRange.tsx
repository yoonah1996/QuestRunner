/* eslint-disable react/prop-types */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable space-in-parens */
import React, { useState } from 'react';
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';
import { makeStyles } from '@material-ui/core';

interface IProps {
  changeRange: Function;
}
const useStyles = makeStyles((theme) => ({
  date: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginRight: '10px',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
  },
}));

const DateRange: React.FC<IProps> = ({ changeRange }) => {
  const [value, setValue] = useState<any>({});
  const classes = useStyles();
  const onSelect = (range: any) => {
    setValue(range);
    changeRange({
      start: range.start.format('YYYYMMDD'),
      end: range.end.format('YYYYMMDD'),
    });
  };
  return (
    <DateRangePicker
      value={value}
      onSelect={onSelect}
      // eslint-disable-next-line react/jsx-boolean-value
      singleDateRange={true}
      className={classes.date}
    />
  );
};

export default DateRange;
