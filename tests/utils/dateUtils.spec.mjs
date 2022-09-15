import { expect, assert } from 'chai';
import { getProperDate, populateWeeksArray, weekEnd, weekNum, weekStart} from '../../utils/dateUtils.mjs';

const weekUtilsFactory = (func, expected) => {
    let day;

    it ('works with a day in the middle of the week in one month', () => {
        day = new Date('2022-08-31T04:00:00.000Z');
        assert.deepEqual(func(day), expected);
    });

    it('works with a day in the middle of the week in another month', () => {
        day = new Date('2022-09-01T04:00:00.000Z');
        assert.deepEqual(func(day), expected);
    });

    it('works when the day is the start of the week', () => {
        day = new Date('2022-08-28T04:00:00.000Z');
        assert.deepEqual(func(day), expected);
    });

    it('works when the day is the last day of the week', () => {
        day = new Date('2022-09-03T04:00:00.000Z');
        assert.deepEqual(func(day), expected);
    });
}

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
        it('works starts a new week on a Monday', () => {
            const week1 = weekNum(new Date('2022-09-11T04:00:00.000Z'));
            const week2 = weekNum(new Date('2022-09-12T04:00:00.000Z'));

            expect(week1).to.equal(week2 - 1);
        });

        it('correctly computes the week number', () => {
            const week = weekNum(new Date('2022-09-15T04:00:00.000Z'));

            expect(week).to.equal(37);
        });
    });

    describe('getProperDate', () => {

        let time, proper;

        it('returns a date', () => {
            time = '6:00 am';
            proper = getProperDate(time);

            expect(proper).to.be.a('date');
        });

        it('works with the first time of the day', () => {
            time = '12:00 am';
            proper = getProperDate(time);

            expect(proper.getHours()).to.equal(0);
            expect(proper.getMinutes()).to.equal(0);
        });

        it ('works with a non-12am morning time', () => {
            time = '6:45 am';
            proper = getProperDate(time);

            expect(proper.getHours()).to.equal(6);
            expect(proper.getMinutes()).to.equal(45);
        });

        it('works with a time during noon', () => {
            time = '12:45 pm';
            proper = getProperDate(time);

            expect(proper.getHours()).to.equal(12);
            expect(proper.getMinutes()).to.equal(45);
        })

        it('works with a time after 12pm', () => {
            time = '5:45 pm';
            proper = getProperDate(time);

            expect(proper.getHours()).to.equal(17);
            expect(proper.getMinutes()).to.equal(45);
        });
    });

    describe('populateWeeksArray', () => {
        it('works with normal input', () => {
            const times = {
                monday: {
                    start: '6:45 am',
                    end: '6:45 pm'
                },
                tuesday: {
                    start: '6:45 am',
                    end: '6:45 pm'
                },
                wednesday: {
                    start: '6:45 am',
                    end: '6:45 pm'
                },
                thursday: {
                    start: '6:45 am',
                    end: '6:45 pm'
                },
                friday: {
                    start: '6:45 am',
                    end: '6:45 pm'
                },
                saturday: {
                    start: '6:45 am',
                    end: '6:45 pm'
                },
                sunday: {
                    start: '6:45 am',
                    end: '6:45 pm'
                }
            };

            const { weeks, json } = populateWeeksArray(times);

            expect(weeks.length).to.equal(54);
            expect(json).to.deep.equal({
                monday: "6:45 am-6:45 pm",
                tuesday: "6:45 am-6:45 pm",
                wednesday: "6:45 am-6:45 pm",
                thursday: "6:45 am-6:45 pm",
                friday: "6:45 am-6:45 pm",
                saturday: "6:45 am-6:45 pm",
                sunday: "6:45 am-6:45 pm"
            });
        });
    });
});