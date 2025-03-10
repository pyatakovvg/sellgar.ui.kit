import { factoryDay, type IDay } from './factory-day.utils.ts';

// interface IOptions {
//   weeks: string[];
// }

export const getCalendarDays = (year: number, month: number): IDay[] => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 - воскресенье, 1 - понедельник, ..., 6 - суббота
  const daysInCurrentMonth = lastDayOfMonth.getDate();

  const calendarDays: IDay[] = [];

  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  const daysToAddFromPreviousMonth = (firstDayOfWeek + 6) % 7;

  for (let i = daysToAddFromPreviousMonth; i > 0; i--) {
    const isWeekday =
      new Date(year, month - 1, daysInPreviousMonth - i + 1).getDay() === 0 ||
      new Date(year, month - 1, daysInPreviousMonth - i + 1).getDay() === 6;
    const day = factoryDay({
      type: 'prev-month' as const,
      isToday: false,
      isWeekday,
      value: new Date(year, month - 1, daysInPreviousMonth - i + 1).toISOString(),
    });
    calendarDays.push(day);
  }

  const today = new Date();
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
    const isWeekday = new Date(year, month, day).getDay() === 0 || new Date(year, month, day).getDay() === 6;
    const dayEntry = factoryDay({
      type: 'current-month' as const,
      isToday: isToday,
      isWeekday, // Воскресенье (0) или Суббота (6)
      value: new Date(year, month, day).toISOString(),
    });
    calendarDays.push(dayEntry);
  }

  const totalDaysInRow = 7;
  const totalDisplayedDays = calendarDays.length;
  const daysToAddFromNextMonth = (totalDaysInRow - (totalDisplayedDays % totalDaysInRow)) % totalDaysInRow;

  for (let day = 1; day <= daysToAddFromNextMonth; day++) {
    const isWeekday = new Date(year, month + 1, day).getDay() === 0 || new Date(year, month + 1, day).getDay() === 6;
    const dayEntry = factoryDay({
      type: 'next-month' as const,
      isToday: false,
      isWeekday,
      value: new Date(year, month + 1, day).toISOString(),
    });
    calendarDays.push(dayEntry);
  }

  return calendarDays;
};
