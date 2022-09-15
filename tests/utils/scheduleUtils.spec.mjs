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

        const merged = mergeStartEndToSchedule(schedule, startTimes, endTimes, days);
        
        expect(merged).to.have.property('name', 'test');
        
        const regex = new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9](am|pm)-([0-1]?[0-9]|2[0-3]):[0-5][0-9](am|pm)$');
        days.forEach(day => {
            const time = merged[day];
            expect(!!regex.test(time)).to.be.true;
        });
    })
});