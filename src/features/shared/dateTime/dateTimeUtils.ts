import {getDay} from 'date-fns';

export const adjustDayNumberOfWeekIfWeekStartsOnSpecificDay = (
  date: Date,
  startDayOfWeek?: number,
): number => {
  const monday = 1;
  startDayOfWeek = startDayOfWeek !== undefined ? startDayOfWeek : monday;

  const dayOfWeek = getDay(date);
  const adjustedDayOfWeek = (dayOfWeek - startDayOfWeek + 7) % 7;

  return adjustedDayOfWeek;
};

export const getTimezoneOffset = (timezone: string): number => {
  const date = new Date();
  const utcDate = new Date(date.toLocaleString('en-US', {timeZone: 'UTC'}));
  const tzDate = new Date(date.toLocaleString('en-US', {timeZone: timezone}));
  const offset = (tzDate.getTime() - utcDate.getTime()) / (1000 * 60);
  return offset;
};

export const convertUTCDateToLocalTimezoneDate = (
  inputDate: Date,
  timezone: string,
) => {
  const targetOffset = getTimezoneOffset(timezone);
  const utcDate = Date.UTC(
    inputDate.getUTCFullYear(),
    inputDate.getUTCMonth(),
    inputDate.getUTCDate(),
    inputDate.getUTCHours(),
    inputDate.getUTCMinutes(),
    inputDate.getUTCSeconds(),
  );
  return new Date(utcDate + targetOffset * 60000);
};

export const getLocalTimezoneStartOfDayAsUTCDate = (
  localTimezoneDate: Date,
  timezone: string,
) => {
  const year = localTimezoneDate.getFullYear();
  const month = localTimezoneDate.getMonth();
  const day = localTimezoneDate.getDate();

  const offsetInHours = -getTimezoneOffset(timezone) / 60;

  const utcStartOfDayForTimeZone = new Date(
    Date.UTC(year, month, day, offsetInHours),
  );

  return utcStartOfDayForTimeZone;
};

export const getDateForStartOfLocalDay = (
  dateString: string,
  timezone: string,
): Date => {
  const inputDate = new Date(dateString);

  const timeZoneDate = convertUTCDateToLocalTimezoneDate(inputDate, timezone);

  const utcStartOfDayForTimeZone = getLocalTimezoneStartOfDayAsUTCDate(
    timeZoneDate,
    timezone,
  );

  return utcStartOfDayForTimeZone;
};

export const getDateForStartOfCurrentLocalDay = (
  timezone: string,
  now: Date = new Date(),
): Date => {
  const result = getDateForStartOfLocalDay(now.toISOString(), timezone);
  return result;
};

export const addDays = (date: Date, days: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

export const getCurrentDateTimeInLocalTimezone = (
  timezone: string,
  now: Date = new Date(),
) => {
  const localTimezoneDate = convertUTCDateToLocalTimezoneDate(now, timezone);
  return localTimezoneDate;
};
