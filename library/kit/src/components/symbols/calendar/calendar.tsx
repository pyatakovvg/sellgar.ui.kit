'use client';

import React from 'react';
import { format, getYear, getMonth, getDate, getHours, getMinutes } from 'date-fns';

import { Day } from './day';
import { DayDisabled } from './day-disabled';
import { WeekDay } from './week-day';
import { Header } from './header';
import { Inputs } from './inputs';

import { getCalendarDays } from './utils/get-days.utils.ts';

import s from './default.module.scss';

const defaultMonths = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];
const defaultWeeks = ['П', 'В', 'С', 'Ч', 'П', 'Сб', 'Вс'];

const getYearOrCurrent = (date?: string) => (date ? getYear(date) : getYear(new Date()));
const getMonthOrCurrent = (date?: string) => (date ? getMonth(date) : getMonth(new Date()));
const getDateOrCurrent = (date?: string) => (date ? getDate(date) : getDate(new Date()));
const getHoursOrCurrent = (date?: string) => (date ? getHours(date) : getHours(new Date()));
const getMinutesOrCurrent = (date?: string) => (date ? getMinutes(date) : getMinutes(new Date()));

interface IProps {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const Calendar: React.FC<IProps> = (props) => {
  const [initialized, setInitialized] = React.useState(false);

  const [selectedDate, setSelectedDate] = React.useState<string | undefined>(() => props.value || props.defaultValue);
  const [selectedYear, setSelectedYear] = React.useState<number>(() => getYearOrCurrent(selectedDate));
  const [selectedMonth, setSelectedMonth] = React.useState<number>(() => getMonthOrCurrent(selectedDate));
  const [selectedDay, setSelectedDay] = React.useState<number>(() => getDateOrCurrent(selectedDate));
  const [selectedHour, setSelectedHour] = React.useState<number>(() => getHoursOrCurrent(selectedDate));
  const [selectedMinutes, setSelectedMinutes] = React.useState<number>(() => getMinutesOrCurrent(selectedDate));

  React.useEffect(() => {
    if (initialized) {
      setSelectedDate(props.value);
    }
  }, [props.value]);

  React.useEffect(() => {
    if (initialized) {
      setSelectedYear(selectedDate ? getYear(selectedDate) : getYear(new Date()));
      setSelectedMonth(selectedDate ? getMonth(selectedDate) : getMonth(new Date()));
      setSelectedDay(selectedDate ? getDate(selectedDate) : getDate(new Date()));
      setSelectedHour(selectedDate ? getHours(selectedDate) : getHours(new Date()));
      setSelectedMinutes(selectedDate ? getMinutes(selectedDate) : getMinutes(new Date()));
    }
  }, [selectedDate]);

  React.useEffect(() => {
    setInitialized(true);
  }, []);

  const days = React.useMemo(() => getCalendarDays(selectedYear, selectedMonth), [selectedYear, selectedMonth]);

  const handlePrevMonth = (month: number) => {
    const newMonth = month - 1;
    if (newMonth < 0) {
      setSelectedYear(selectedYear - 1);
      setSelectedMonth(11);
    } else {
      setSelectedMonth(newMonth);
    }
  };

  const handleNextMonth = (month: number) => {
    const newMonth = month + 1;
    if (newMonth > 11) {
      setSelectedYear(selectedYear + 1);
      setSelectedMonth(0);
    } else {
      setSelectedMonth(newMonth);
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Header
          year={selectedYear}
          month={defaultMonths[selectedMonth]}
          onPrevMonthClick={() => handlePrevMonth(selectedMonth)}
          onNextMonthClick={() => handleNextMonth(selectedMonth)}
        />
      </div>
      <div className={s.weeks}>
        {defaultWeeks.map((day, index) => {
          return (
            <WeekDay key={index} isWeekday={index === 5 || index === 6}>
              {day}
            </WeekDay>
          );
        })}
      </div>
      <div className={s.days}>
        {days.map((day, index) => {
          if (day.type === 'prev-month' || day.type === 'next-month') {
            return <DayDisabled key={index}>{format(day.value, 'dd')}</DayDisabled>;
          }
          return (
            <Day
              key={index}
              isActive={selectedDay === getDate(day.value)}
              isToday={day.isToday}
              isWeekday={day.isWeekday}
              onClick={() => {}}
            >
              {format(day.value, 'd')}
            </Day>
          );
        })}
      </div>
      <div className={s.control}>
        <Inputs />
      </div>
    </div>
  );
};
