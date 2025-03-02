'use client';

import React from 'react';
import ReactCalendar from 'react-calendar';

import s from './default.module.scss';

export const Calendar = () => {
  return (
    <div className={s.wrapper}>
      <ReactCalendar className={s.calendar} view={'month'} />
    </div>
  );
};
