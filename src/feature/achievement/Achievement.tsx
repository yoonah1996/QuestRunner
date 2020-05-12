/* eslint-disable radix */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Fade } from '@material-ui/core';
import DateRange from './DateRange';
import CustomPaginationActionTable from './CustomPaginationActionsTable';
import { RootState } from '..';
import { QuestItem } from '../common/interfaces';
import MetaInfo from './MetaInfo';

interface range {
  start: string;
  end: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '0px',
    marginBottom: '10px',
  },
  date: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginRight: '10px',
    borderRadius: '5px',
  },
  info: {
    margin: '15px 0',
    fontSize: '15px',
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.background.paper,
    padding: '0 15px',
    borderRadius: '5px',
  },
  board: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '70vw',
  },
}));

const Achievement: React.FC = () => {
  const classes = useStyles();
  const [range, setRange] = useState<range>({
    start: '',
    end: '',
  });
  const [quests, setQuests] = useState<QuestItem[] | undefined>([]);
  const [filiteredQuests, setFiliteredQuests] = useState<
    QuestItem[] | undefined
  >([]);
  const questsFromStore = useSelector(
    (state: RootState) => state.userLogin.user?.quests,
  );
  const changeRange = (checkDate: any) => {
    setRange({
      start: checkDate.start,
      end: checkDate.end,
    });
  };
  const getQuestFromRedux = (start: string, end: string) => {
    let filterdQuset: any[] | undefined;
    if (!start && !end) {
      // null 처리해야함
      filterdQuset = questsFromStore?.map((quest) => ({
        ...quest,
        due_date: quest.due_date ? parseInt(quest.due_date.slice(0, 8)) : null,
      }));
    } else {
      filterdQuset = questsFromStore
        ?.filter((quest) => {
          if (quest.due_date === null) {
            return null;
          }
          const date = parseInt(quest.due_date.slice(0, 8));
          return parseInt(start) <= date && date <= parseInt(end);
        })
        .map((quest: any) => ({
          ...quest,
          due_date: quest.due_date
            ? parseInt(quest.due_date.slice(0, 8))
            : null,
        }));
    }
    return setQuests(filterdQuset);
  };
  const onFilteredQuests = (filteredQuests: any) => {
    setFiliteredQuests(filteredQuests);
  };
  useEffect(() => {
    // get questData from redux store
    getQuestFromRedux(range.start, range.end);
  }, [range]);
  return (
    <Fade in>
      <div className={classes.root}>
        <MetaInfo quests={quests} onFilteredQuests={onFilteredQuests} />
        <div className={classes.board}>
          <DateRange changeRange={changeRange} />
          <CustomPaginationActionTable quests={filiteredQuests} />
        </div>
      </div>
    </Fade>
  );
};

export default Achievement;
