import { Grid, Stack, TextField, Typography } from '@mui/material';
import { stringToTimeObject } from '../../../utils/dateUtils.mjs';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers';
import { useEffect } from 'react';

export const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export default function WeekEditor ({ schedule, times, setTimes, editMode }) {
  useEffect(() => {
    if (schedule) {
      const res = {};
      DAYS.forEach(day => {
        res[day] = {
          start: getTime(day, true),
          end: getTime(day, false)
        };
      });
      setTimes(res);
    }
  }, [schedule]);

  const updateTimes = (day, start, time) => {
    const temp = JSON.clone(times);
    temp[day][start ? 'start' : 'end'] = time;
    setTimes(temp);
  };

  const getTime = (day, start) => {
    const times = schedule[day.toLowerCase()].split('-');
    const time = start ? times[0] : times[1];
    const { hour, minute } = stringToTimeObject(time);
    return dayjs().hour(hour).minute(minute);
  };
  const renderWeek = () => {
    return DAYS.map(day => {
      return (
        <Grid key={day} item xs={1.7} pr={3}>
          <Stack spacing={3}>
            <Typography fontWeight={1000} textAlign='center'>
              {day}
            </Typography>
            <TimePicker
              label='Start'
              value={times[day]?.start}
              onChange={updateTimes.bind(this, day, true)}
              renderInput={(params) => <TextField {...params} />}
              disabled={!editMode}
            />
            <TimePicker
              label='End'
              value={times[day]?.end}
              onChange={updateTimes.bind(this, day, false)}
              renderInput={(params) => <TextField {...params} />}
              disabled={!editMode}
            />
          </Stack>
        </Grid>
      );
    });
  };

  if (schedule) {
    return (
      <Grid item pl={5} display='flex' flexDirection='row' flexWrap={'wrap'} >
        { renderWeek() }
      </Grid>
    );
  } else return null;
}
