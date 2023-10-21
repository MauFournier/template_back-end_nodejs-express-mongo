import {
  adjustDayNumberOfWeekIfWeekStartsOnSpecificDay,
  getTimezoneOffset,
  addDays,
  getCurrentDateTimeInLocalTimezone,
  convertUTCDateToLocalTimezoneDate,
  getDateForStartOfLocalDay,
  getDateForStartOfCurrentLocalDay,
} from '../dateTimeUtils';

describe('dateTimeUtils', () => {
  describe('adjustDayNumberOfWeekIfWeekStartsOnSpecificDay', () => {
    it('should get the day of the week starting from Monday', async () => {
      const aWednesday = new Date(2020, 0, 1);

      const dayOfWeekStartingMonday =
        adjustDayNumberOfWeekIfWeekStartsOnSpecificDay(aWednesday, 1);

      expect(dayOfWeekStartingMonday).toBe(2);
    });

    it('should get the day of the week starting from Monday when no day is provided', async () => {
      const aWednesday = new Date(2020, 0, 1);

      const dayOfWeekProvidingNoStartDay =
        adjustDayNumberOfWeekIfWeekStartsOnSpecificDay(aWednesday);

      expect(dayOfWeekProvidingNoStartDay).toBe(2);
    });

    it('should get the day of the week starting from Sunday', async () => {
      const aWednesday = new Date(2020, 0, 1);

      const dayOfWeekStartingSunday =
        adjustDayNumberOfWeekIfWeekStartsOnSpecificDay(aWednesday, 0);

      expect(dayOfWeekStartingSunday).toBe(3);
    });
  });

  describe('getTimezoneOffset', () => {
    it('should return the correct timezone offset for Costa Rica', async () => {
      const timezoneOffset = getTimezoneOffset('America/Costa_Rica');

      expect(timezoneOffset).toBe(-6 * 60);
    });

    it('should return the correct timezone offset for Accra, Ghana', async () => {
      const timezoneOffset = getTimezoneOffset('Africa/Accra');

      expect(timezoneOffset).toBe(0 * 60);
    });

    it('should return the correct timezone offset for Jakarta, Indonesia', async () => {
      const timezoneOffset = getTimezoneOffset('Asia/Jakarta');

      expect(timezoneOffset).toBe(7 * 60);
    });
  });

  describe('convertUTCDateToLocalTimezoneDate', () => {
    it('should convert the date from UTC to local timezone', async () => {
      const localTimezone = 'America/Costa_Rica';

      const aDate = new Date('2020-01-01T00:00:00.000Z');

      const localDate = convertUTCDateToLocalTimezoneDate(aDate, localTimezone);

      expect(localDate.toISOString()).toBe('2019-12-31T18:00:00.000Z');
    });
  });

  describe('getDateForStartOfLocalDay', () => {
    it('should return the adjusted ISO string of the start of the local day', async () => {
      const aDate = '2020-01-01T00:00:00.000Z';

      const adjustedDate = getDateForStartOfLocalDay(
        aDate,
        'America/Costa_Rica',
      );

      expect(adjustedDate.toISOString()).toBe('2019-12-31T06:00:00.000Z');
    });
  });

  describe('getDateForStartOfCurrentLocalDay', () => {
    it('should return the adjusted date object of the start of the current local day', async () => {
      const timezone = 'America/Costa_Rica';

      const startOfLocalDayUTC = getDateForStartOfCurrentLocalDay(timezone);
      const now = new Date();

      const options: Intl.DateTimeFormatOptions = {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat('en-GB', options);
      const result = formatter.format(startOfLocalDayUTC);

      const nowInLocalTimezone = new Date(
        now.toLocaleString('en-US', {timeZone: timezone}),
      );
      nowInLocalTimezone.setHours(0, 0, 0, 0);

      const expectedDateString = formatter.format(nowInLocalTimezone);

      expect(result).toContain(expectedDateString);
    });

    it('should return the adjusted date object of the start of the "current" local day, with a custom/fake "now" date that was passed in', async () => {
      const timezone = 'America/Costa_Rica';

      const fakeNow = new Date('2020-01-01T12:00:00.000Z');

      const startOfLocalDayUTC = getDateForStartOfCurrentLocalDay(
        timezone,
        fakeNow,
      );

      const options: Intl.DateTimeFormatOptions = {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat('en-GB', options);
      const result = formatter.format(startOfLocalDayUTC);

      const nowInLocalTimezone = new Date(
        fakeNow.toLocaleString('en-US', {timeZone: timezone}),
      );
      nowInLocalTimezone.setHours(0, 0, 0, 0);

      const expectedDateString = formatter.format(nowInLocalTimezone);

      expect(result).toContain(expectedDateString);
    });
  });

  describe('addDays', () => {
    it('should add the specified number of days to the given date', async () => {
      const aDate = new Date('2020-01-01T00:00:00.000Z');

      const newDate = addDays(aDate, 1);

      expect(newDate.toISOString()).toBe('2020-01-02T00:00:00.000Z');
    });
  });

  describe('getCurrentDateTimeInLocalTimezone', () => {
    it('should return the current date and time in the specified local timezone', async () => {
      // Warning - this test can fail sometimes if the clock
      // ticks over to a new second between setting 'now' below
      // and doing the same in the function under test.
      // This should be extremely infrequent, so if you
      // run tests again and it works, we're good.

      const timezone = 'America/Costa_Rica';
      const timezoneOffset = getTimezoneOffset(timezone);

      const now = new Date();
      const adjustedDate = getCurrentDateTimeInLocalTimezone(timezone);

      const nowInLocalTimezone = new Date(
        now.getTime() + timezoneOffset * 60 * 1000,
      );

      nowInLocalTimezone.setMilliseconds(0);

      expect(adjustedDate.toISOString()).toBe(nowInLocalTimezone.toISOString());
    });

    it('should return the "current" date and time in the specified local timezone, when a custom/fake "now" date is passed in', async () => {
      const timezone = 'America/Costa_Rica';
      const timezoneOffset = getTimezoneOffset(timezone);

      const fakeNow = new Date('2020-01-01T12:00:00.000Z');
      const adjustedDate = getCurrentDateTimeInLocalTimezone(timezone, fakeNow);

      const nowInLocalTimezone = new Date(
        fakeNow.getTime() + timezoneOffset * 60 * 1000,
      );

      nowInLocalTimezone.setMilliseconds(0);

      expect(adjustedDate.toISOString()).toBe(nowInLocalTimezone.toISOString());
    });
  });
});
