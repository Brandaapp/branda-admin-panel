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
