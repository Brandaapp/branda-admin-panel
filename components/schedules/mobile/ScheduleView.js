import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { stringToTimeObject, weekEnd, weekNum, weekStart } from '../../../utils/dateUtils.mjs';
import dayjs from 'dayjs';
import WeekPicker from '../desktop/WeekPicker';

import { DAYS } from '../desktop/WeekEditor.js';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const schedulesCache = {};

export default function ScheduleView ({ forEditPage }) {
  const [schedules, setSchedules] = useState(undefined);
  const [day, setDay] = useState(undefined);
  const [place, setPlace] = useState('');

  const fetchWeekSchedule = (day) => {
    setDay(day);
    const week = weekNum(day);

    if (schedulesCache[week]) {
      const tempSchedule = JSON.clone(schedulesCache[week]);
      setPlace(place || tempSchedule[0].name);
      setSchedules(tempSchedule);
    } else {
      axios
        .get(`/api/schedules/${week}`)
        .then((response) => {
          schedulesCache[week] = JSON.clone(response.data);
          setPlace(place || response.data[0].name);
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
    fetchWeekSchedule(dayjs(new Date()));
  }, []);

  if (schedules) {
    return (
      <Grid container spacing={2} direction='column' alignItems={'center'} pt={3}>
        <Grid item textAlign='center' display={'flex'} flexDirection='column' justifyContent={'center'}>
          <Grid item>
            <Typography
              fontSize={30}
            >
              Current Week:
            </Typography>
          </Grid>
          <Grid item pt={3}>
            <Typography
              fontSize={20}
            >
              {weekStart(day).format('L')} {' - '}
              {weekEnd(day).format('L')}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <WeekPicker day={day} updateData={fetchWeekSchedule}/>
        </Grid>
        <Grid item width={'60vw'}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Place</InputLabel>
            <Select
              labelId="place-select-label"
              id="palce-select"
              value={place}
              label='Place'
              onChange={(event) => setPlace(event.target.value)}
            >
              {schedules.map(schedule => {
                const { name } = schedule;
                return (
                  <MenuItem key={name} value={name}>{name}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item pt={3} width='90vw'>
          {DAYS.map(weekDay => {
            const dayTimes = schedules.find(schedule => schedule.name === place)[weekDay.toLowerCase()];
            const [start, end] = dayTimes.split('-');
            const startObject = stringToTimeObject(start);
            const endObject = stringToTimeObject(end);
            const closed =
              startObject.hour === 11 && startObject.minute === 0 && endObject.hour === 11 && endObject.minute === 1;
            return (
              <Accordion key={weekDay}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>{weekDay}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color={closed ? 'red' : 'green'}>
                    {closed
                      ? 'Closed'
                      : time(startObject, endObject)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Grid>
        {forEditPage
          ? <Grid item textAlign={'center'} mt={2}>
            <Typography variant='caption'>
            If you would like to edit these schedules, or create a new schedule,
            please re-visit this page on a desktop device.
            </Typography>
          </Grid>
          : null}
      </Grid>
    );
  } else {
    return (
      <Box height='90vh' display={'flex'} flexDirection='column' alignItems={'center'} justifyContent='center'>
        <Image alt='' src="/branda-admin-loading-gif.gif" width={280} height={280} />
      </Box>
    );
  }
}
