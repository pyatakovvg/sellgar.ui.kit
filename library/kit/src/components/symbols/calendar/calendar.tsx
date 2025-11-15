import React from 'react';
import moment from 'moment';

import { Day } from './day';
import { DayDisabled } from './day-disabled';
import { WeekDay } from './week-day';
import { Header } from './header';
import { Inputs } from './inputs';

import { getCalendarDays } from './utils/get-days.utils.ts';

import s from './default.module.scss';

const defaultMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const defaultWeeks = ['П', 'В', 'С', 'Ч', 'П', 'Сб', 'Вс'];

const getYearOrCurrent = (date: string) => moment(date).year();
const getMonthOrCurrent = (date: string) => moment(date).month();

interface IProps {
  defaultValue?: string;
  value?: string;
  format?: string;
  onChange: (value: string | undefined) => void;
}

export const Calendar: React.FC<IProps> = (props) => {
  const [initialized, setInitialized] = React.useState(false);
  const [changed, setChanged] = React.useState(false);

  const [selectedDate, setSelectedDate] = React.useState<string>(() => moment(props.value || props.defaultValue || new Date()).format(props.format));

  React.useEffect(() => {
    if (changed) {
      props.onChange && props.onChange(selectedDate);
      setChanged(false);
    }
  }, [changed]);

  React.useEffect(() => {
    if (initialized) {
      setSelectedDate(moment(props.value || new Date()).format(props.format));
    }
  }, [props.value]);

  React.useEffect(() => {
    setInitialized(true);
  }, []);

  const days = React.useMemo(() => getCalendarDays(getYearOrCurrent(selectedDate), getMonthOrCurrent(selectedDate)), [selectedDate]);

  const handlePrevMonth = (month: number) => {
    const newMonth = month - 1;
    if (newMonth < 0) {
      setSelectedDate(moment(selectedDate).subtract(1, 'year').month(11).format(props.format));
    } else {
      setSelectedDate(moment(selectedDate).month(newMonth).format(props.format));
    }
  };

  const handleNextMonth = (month: number) => {
    const newMonth = month + 1;
    if (newMonth > 11) {
      setSelectedDate(moment(selectedDate).add(1, 'year').month(0).format(props.format));
    } else {
      setSelectedDate(moment(selectedDate).month(newMonth).format(props.format));
    }
  };

  const handleChangeDate = (value: string) => {
    setSelectedDate(moment(selectedDate).date(moment(value).date()).format(props.format));
    setChanged(true);
  };

  const handleChange = (value: string) => {
    setSelectedDate(value);
    setChanged(true);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Header
          year={moment(selectedDate).year()}
          month={defaultMonths[moment(selectedDate).month()]}
          onPrevMonthClick={() => handlePrevMonth(moment(selectedDate).month())}
          onNextMonthClick={() => handleNextMonth(moment(selectedDate).month())}
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
            return <DayDisabled key={index}>{moment(day.value).format('DD')}</DayDisabled>;
          }
          return (
            <Day
              key={index}
              isActive={moment(selectedDate).date() === moment(day.value).date()}
              isToday={day.isToday}
              isWeekday={day.isWeekday}
              onClick={() => handleChangeDate(day.value)}
            >
              {moment(day.value).format('DD')}
            </Day>
          );
        })}
      </div>
      <div className={s.control}>
        <Inputs value={selectedDate} onChange={handleChange} />
      </div>
    </div>
  );
};
