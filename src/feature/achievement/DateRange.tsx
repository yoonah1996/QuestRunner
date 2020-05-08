/* eslint-disable react/prop-types */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable space-in-parens */
import React, { useState } from 'react';
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';

interface IProps {
  changeRange: Function;
}

const DateRange: React.FC<IProps> = ({ changeRange }) => {
  const [value, setValue] = useState<any>({});
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
    />
  );
};

export default DateRange;
