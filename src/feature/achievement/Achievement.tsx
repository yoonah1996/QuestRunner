/* eslint-disable radix */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import DateRange from './DateRange';
import CustomPaginationActionTable from './CustomPaginationActionsTable';
import { RootState } from '..';
import { QuestItem } from '../common/interfaces';

interface range {
  start: string;
  end: string;
}
const dummyQuests = [
  {
    _id: 58472052,
    created_at: '20200412-130304',
    title: 'title1',
    contents: 'contents1',
    due_date: '20200413-110304',
    checked: true,
    completed: false,
  },
  {
    _id: 58472053,
    created_at: '20200412-200948',
    title: 'title2',
    contents: 'contents2',
    due_date: '20200414-120000',
    checked: false,
    completed: true,
  },
  {
    _id: 58472054,
    created_at: '20200412-200948',
    title: 'title3',
    contents: 'contents3',
    due_date: '20200415-120000',
    checked: false,
    completed: false,
  },
  {
    _id: 58472055,
    created_at: '20200412-130304',
    title: 'title1',
    contents: 'contents4',
    due_date: '20200413-110304',
    checked: true,
    completed: false,
  },
  {
    _id: 58472056,
    created_at: '20200412-130304',
    title: 'title1',
    contents: 'contents5',
    due_date: '20200413-110304',
    checked: true,
    completed: false,
  },
  {
    _id: 58472057,
    created_at: '20200412-130304',
    title: 'title1',
    contents: 'contents6',
    due_date: '20200413-110304',
    checked: true,
    completed: false,
  },
  {
    _id: 58472058,
    created_at: '20200412-130304',
    title: 'title1',
    contents: 'contents7',
    due_date: '20200413-110304',
    checked: true,
    completed: false,
  },
  {
    _id: 58472059,
    created_at: '20200412-130304',
    title: 'title1',
    contents: 'contents8',
    due_date: '20200413-110304',
    checked: true,
    completed: false,
  },
  {
    _id: 58472050,
    created_at: '20200412-130304',
    title: 'title1',
    contents: 'contents9',
    due_date: '20200413-110304',
    checked: true,
    completed: false,
  },
];

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Achievement: React.FC = () => {
  const classes = useStyles();
  const [range, setRange] = useState<range>({
    start: '',
    end: '',
  });
  const [quests, setQuests] = useState<QuestItem[] | undefined>([]);
  // const questsFromStore = useSelector(
  //   (state: RootState) => state.userLogin.user?.quests,
  // );
  const changeRange = (checkDate: any) => {
    setRange({
      start: checkDate.start,
      end: checkDate.end,
    });
  };
  const getQuestFromRedux = (start: string, end: string) => {
    if (!start && !end) {
      return setQuests(dummyQuests);
    }
    const filterdQuset: any[] = dummyQuests?.filter((quest) => {
      const date = parseInt(quest.due_date.slice(0, 8));
      return parseInt(start) <= date && date <= parseInt(end);
    });
    return setQuests(filterdQuset);
  };
  useEffect(() => {
    // get questData from redux store
    getQuestFromRedux(range.start, range.end);
  }, [range]);
  return (
    <div className={classes.root}>
      <DateRange changeRange={changeRange} />
      <CustomPaginationActionTable quests={quests} />
    </div>
  );
};

export default Achievement;
