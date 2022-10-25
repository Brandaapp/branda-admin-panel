import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { stringToTimeObject, weekNum } from '../../../utils/dateUtils.mjs';
import LoadingLogo from '../../shared/LoadingLogo.js';

import { DAYS } from './WeekEditor';
import WeekPickerHeader from './WeekPickerHeader.js';

const schedulesCache = {};

export default function ScheduleView () {
  const [schedules, setSchedules] = useState(undefined);
  const [day, setDay] = useState(undefined);

  const fetchWeekSchedule = (day) => {
    setDay(day);
    const week = weekNum(day);

    if (schedulesCache[week]) {
      const tempSchedule = JSON.clone(schedulesCache[week]);
      setSchedules(tempSchedule);
    } else {
      axios
        .get(`/api/schedules/${week}`)
        .then((response) => {
          schedulesCache[week] = JSON.clone(response.data);
          setSchedules(response.data);
        });
    }
  };

  const time = (start, end) => {
    return (
      <>
        {dayjs().hour(start.hour).minute(start.minute).format('LT')} {' - '}
        {dayjs().hour(end.hour).minute(end.minute).format('LT')}
      </>
    );
  };

  useEffect(() => {
    fetchWeekSchedule(dayjs());
  }, []);

  if (schedules) {
    return (
      <Box p={5} height='85vh'>
        <Grid container spacing={3} direction='column'>
          <WeekPickerHeader day={day} fetchWeekSchedule={fetchWeekSchedule} />
          <Grid item xs={8} display='flex' flexDirection={'row'} justifyContent={'center'}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Place</TableCell>
                    <TableCell align="right" sx={{ width: '12%' }}>Sunday</TableCell>
                    <TableCell align="right" sx={{ width: '12%' }}>Monday</TableCell>
                    <TableCell align="right" sx={{ width: '12%' }}>Tuesday</TableCell>
                    <TableCell align="right" sx={{ width: '12%' }}>Wednesday</TableCell>
                    <TableCell align="right" sx={{ width: '12%' }}>Thursday</TableCell>
                    <TableCell align="right" sx={{ width: '12%' }}>Friday</TableCell>
                    <TableCell align="right" sx={{ width: '12%' }}>Saturday</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {schedules.map(schedule => {
                    return (
                      <TableRow
                        key={schedule.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {schedule.name}
                        </TableCell>
                        {DAYS.map(weekDay => {
                          weekDay = weekDay.toLowerCase();
                          const dayTimes = schedule[weekDay];
                          const [start, end] = dayTimes.split('-');
                          const startObject = stringToTimeObject(start);
                          const endObject = stringToTimeObject(end);
                          const closed =
                            startObject.hour === 11 && startObject.minute === 0 &&
                            endObject.hour === 11 && endObject.minute === 1;
                          return (
                            <TableCell
                              key={schedule.name + weekDay}
                              align="right"
                              sx={{
                                color: closed ? 'red' : 'black'
                              }}
                            >
                              {closed
                                ? 'Closed'
                                : time(startObject, endObject)}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return (
      <LoadingLogo />
    );
  }
}
