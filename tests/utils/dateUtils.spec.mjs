import { expect } from 'chai';
import dayjs from 'dayjs';
import { packageScheduleData, stringToTimeObject, weekEnd, weekNum, weekStart } from '../../utils/dateUtils.mjs';

const weekUtilsFactory = (func, expected) => {
  let day, computed;

  it('works with a day in the middle of the week in one month', () => {
    day = new Date('2022-08-31T04:00:00.000Z');
    computed = func(day);

    expect(computed.date()).to.equal(expected.getDate());
    expect(computed.month()).to.equal(expected.getMonth());
    expect(computed.year()).to.equal(expected.getFullYear());
  });

  it('works with a day in the middle of the week in another month', () => {
    day = new Date('2022-09-01T04:00:00.000Z');
    computed = func(day);

    expect(computed.date()).to.equal(expected.getDate());
    expect(computed.month()).to.equal(expected.getMonth());
    expect(computed.year()).to.equal(expected.getFullYear());
  });

  it('works when the day is the start of the week', () => {
    day = new Date('2022-08-28T04:00:00.000Z');
    computed = func(day);

    expect(computed.date()).to.equal(expected.getDate());
    expect(computed.month()).to.equal(expected.getMonth());
    expect(computed.year()).to.equal(expected.getFullYear());
  });

  it('works when the day is the last day of the week', () => {
    day = new Date('2022-09-03T04:00:00.000Z');
    computed = func(day);

    expect(computed.date()).to.equal(expected.getDate());
    expect(computed.month()).to.equal(expected.getMonth());
    expect(computed.year()).to.equal(expected.getFullYear());
  });
};

describe('dateUtils', () => {
  describe('weekStart', () => {
    const expected = new Date('2022-08-28T04:00:00.000Z');

    weekUtilsFactory(weekStart, expected);
  });

  describe('weekEnd', () => {
    const expected = new Date('2022-09-03T04:00:00.000Z');

    weekUtilsFactory(weekEnd, expected);
  });

  describe('weekNum', () => {
    it('works starts a new week on a Sunday', () => {
      const week1 = weekNum(new Date('2022-09-10T04:00:00.000Z'));
      const week2 = weekNum(new Date('2022-09-11T04:00:00.000Z'));

      expect(week1).to.equal(week2 - 1);
    });

    it('correctly computes the week number', () => {
      const week = weekNum(new Date('2022-09-15T04:00:00.000Z'));

      expect(week).to.equal(37);
    });
  });

  describe('stringToTimeObject', () => {
    it('works with a normal morning time', () => {
      const time = '6:45 am';
      const expected = {
        hour: 6,
        minute: 45
      };

      expect(stringToTimeObject(time)).to.deep.equal(expected);
    });

    it('works with a normal evening time', () => {
      const time = '6:45 pm';
      const expected = {
        hour: 18,
        minute: 45
      };

      expect(stringToTimeObject(time)).to.deep.equal(expected);
    });

    it('works with a random amount of spaces before the AM/PM', () => {
      const random = x => Math.floor(Math.random() * x);
      const spaces = Array(random(10))
        .fill()
        .map(e => ' ')
        .join('');
      const time = '6:45' + spaces + 'pm';
      const expected = {
        hour: 18,
        minute: 45
      };

      expect(stringToTimeObject(time)).to.deep.equal(expected);
    });
  });

  describe('packageScheduleData', () => {
    const times = {
      sunday: {
        start: dayjs().hour(11).minute(0),
        end: dayjs().hour(11).minute(1)
      },
      monday: {
        start: dayjs().hour(9).minute(0),
        end: dayjs().hour(17).minute(0)
      },
      tuesday: {
        start: dayjs().hour(9).minute(0),
        end: dayjs().hour(17).minute(0)
      },
      wednesday: {
        start: dayjs().hour(9).minute(0),
        end: dayjs().hour(17).minute(0)
      },
      thursday: {
        start: dayjs().hour(9).minute(0),
        end: dayjs().hour(17).minute(0)
      },
      friday: {
        start: dayjs().hour(9).minute(0),
        end: dayjs().hour(16).minute(0)
      },
      saturday: {
        start: dayjs().hour(11).minute(0),
        end: dayjs().hour(11).minute(1)
      }
    };

    const expected = {
      sunday: '11:00am-11:01am',
      monday: '9:00am-5:00pm',
      tuesday: '9:00am-5:00pm',
      wednesday: '9:00am-5:00pm',
      thursday: '9:00am-5:00pm',
      friday: '9:00am-4:00pm',
      saturday: '11:00am-11:01am'
    };

    expect(packageScheduleData(times)).to.deep.equal(expected);
  });
});
