/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import DateRange from './DateRange';
import AchievementList from './AchievementList';

interface range {
  start: string;
  end: string;
}

const dummyData = {
  quests: [
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
  ],
};

const Achievement: React.FC = () => {
  const [range, setRange] = useState<range>({
    start: '',
    end: '',
  });
  const changeRange = (checkDate: any) => {
    setRange({
      start: checkDate.start,
      end: checkDate.end,
    });
  };
  return (
    <div>
      <DateRange changeRange={changeRange} />
      {dummyData.quests.map((quest) => (
        <AchievementList key={quest._id} quest={quest} />
      ))}
    </div>
  );
};

export default Achievement;
