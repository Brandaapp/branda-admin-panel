import { expect } from "chai";
import { mergeStartEndToSchedule } from "../../utils/scheduleUtils.mjs";

describe('scheduleUtils', () => {
    it('correctly merges a schedule', () => {
        const schedule = { name: 'test' };
        const startTimes = {
            monday: new Date('2022-09-11T12:00:00.000Z'),
            tuesday: new Date('2022-09-12T12:00:00.000Z'),
            wednesday: new Date('2022-09-13T12:00:00.000Z'),
            thursday: new Date('2022-09-14T12:00:00.000Z'),
            friday: new Date('2022-09-15T12:00:00.000Z'),
            saturday: new Date('2022-09-16T12:00:00.000Z'),
            sunday: new Date('2022-09-17T12:00:00.000Z')
        };
        const endTimes = {
            monday: new Date('2022-09-11T20:00:00.000Z'),
            tuesday: new Date('2022-09-12T20:00:00.000Z'),
            wednesday: new Date('2022-09-13T20:00:00.000Z'),
            thursday: new Date('2022-09-14T20:00:00.000Z'),
            friday: new Date('2022-09-15T20:00:00.000Z'),
            saturday: new Date('2022-09-16T20:00:00.000Z'),
            sunday: new Date('2022-09-17T20:00:00.000Z')
        }
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

        expect(mergeStartEndToSchedule(schedule, startTimes, endTimes, days)).to.deep.equal({
            name: 'test',
            monday: '8:00am-4:00pm',
            tuesday: '8:00am-4:00pm',
            wednesday: '8:00am-4:00pm',
            thursday: '8:00am-4:00pm',
            friday: '8:00am-4:00pm',
            saturday: '8:00am-4:00pm',
            sunday: '8:00am-4:00pm'
        });
    })
});