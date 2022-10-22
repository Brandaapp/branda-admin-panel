import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';
import weekday from 'dayjs/plugin/weekday.js';

dayjs.extend(weekOfYear);
dayjs.extend(weekday);

export function packageScheduleData (times) {
  const body = {};

  Object.keys(times).forEach(day => {
    const start = dayjs(times[day].start).format('h:mm a').replace(' ', '');
    const end = dayjs(times[day].end).format('h:mm a').replace(' ', '');
    body[day.toLocaleLowerCase()] = `${start}-${end}`;
  });

  return body;
}

export function stringToTimeObject (time) {
  const [hour, minute] = time.split(':');
  const pmReg = /([0-9][0-9])([ ]*)?([Pp][Mm])/;
  return {
    minute: parseInt(minute || 0),
    hour: pmReg.test(minute)
      ? (hour === '12' ? 12 : parseInt(hour) + 12)
      : (hour === '12') ? 0 : parseInt(hour)
  };
}

export function weekStart (day) {
  return dayjs(day).startOf('week');
}

export function weekEnd (day) {
  return dayjs(day).endOf('week');
}

export function weekNum (day) {
  return dayjs(day).week() - 1;
}

export function getProperDate (time) {
  const am = time.indexOf('am') > -1;
  const date = new Date();

  let strippedTime;

  if (am) {
    strippedTime = time.substring(0, time.indexOf('am')).trim();
  } else {
    strippedTime = time.substring(0, time.indexOf('pm')).trim();
  }

  const partition = strippedTime.split(':');
  let hour = partition[0];
  const minute = partition[1] === undefined ? '00' : partition[1];

  if (am) {
    if (hour === '12') {
      hour = '0';
    }
  } else {
    if (hour !== '12') {
      const n = parseInt(hour) + 12;
      hour = n.toString();
    }
  }

  date.setHours(hour);
  date.setMinutes(minute);

  return date;
}

export function getDefaultWeekTimes () {
  return {
    monday: { start: '7:30am', end: '2:00am' },
    tuesday: { start: '7:30am', end: '2:00am' },
    wednesday: { start: '7:30am', end: '2:00am' },
    thursday: { start: '7:30am', end: '2:00am' },
    friday: { start: '7:30am', end: '2:00am' },
    saturday: { start: '7:30am', end: '2:00am' },
    sunday: { start: '7:30am', end: '2:00am' }
  };
}

export function populateWeeksArray (times) {
  const json = {};
  Object.keys(times).forEach((day) => {
    json[day] = times[day].start + '-' + times[day].end;
  });
  const weeks = [];
  for (let i = 0; i < 54; i++) {
    // overpopulate array
    weeks.push(json);
  }
  return { weeks, json };
}
