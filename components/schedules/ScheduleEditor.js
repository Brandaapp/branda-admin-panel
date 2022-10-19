import {
  Alert,
  Box,
  Button,
  Fab,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Tooltip,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { weekStart, weekEnd, weekNum } from '../../utils/dateUtils.mjs';
import { Add, Close } from '@mui/icons-material';

import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';

import WeekPicker from './WeekPicker.js';
import WeekEditor from './WeekEditor.js';

dayjs.extend(isBetweenPlugin);

const schedulesCache = {};

export default function ScheduleEditor ({ isMobile }) {
  const [schedules, setSchedules] = useState(null);
  const [place, setPlace] = useState('');
  const [day, setDay] = useState('');
  const [times, setTimes] = useState({});

  const [snackMeta, setSnackMeta] = useState({ open: false, message: undefined, color: '' });

  const fetchWeekSchedule = (day) => {
    setDay(day);
    const week = weekNum(day);

    if (schedules && schedulesCache[week]) {
      setSchedules(JSON.clone(schedulesCache[week]));
    } else {
      axios
        .get(`/api/schedules/${week}`)
        .then((response) => {
          schedulesCache[week] = JSON.clone(response.data);
          setSchedules(response.data);
          setPlace(place || response.data[0].name);
        });
    }
  };

  const closeSnack = () => {
    const snack = JSON.clone(snackMeta);
    snack.open = false;
    setSnackMeta(snack);
  };

  const snackAction = (
    <div>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnack}
      >
        <Close fontSize="small" />
      </IconButton>
    </div>
  );

  useEffect(() => {
    fetchWeekSchedule(dayjs(new Date()));
  }, []);

  if (schedules) {
    return (
      <Box pt={12} px={5} display='flex' flexDirection={'column'}>
        <Grid container spacing={2} direction='column'>
          <Grid container display='flex' justifyContent={'space-around'} alignItems={'center'} pl={3}>
            <Grid item>
              <WeekPicker
                day={day}
                updateData={fetchWeekSchedule}
              />
            </Grid>
            <Grid item>
              <Typography
                fontSize={30}
                fontWeight={100}
              >
                <b>Current Week: {' '}</b>
                {weekStart(day).format('L')} {' - '}
                {weekEnd(day).format('L')}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel id="place-select-label">Place</InputLabel>
                <Select
                  labelId="place-select-label"
                  id="place-select"
                  value={place}
                  label='Place'
                  onChange={(e) => setPlace(e.target.value)}
                >
                  {schedules.map(schedule => {
                    return (
                      <MenuItem key={schedule.name} value={schedule.name}>{schedule.name}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <WeekEditor
            schedule={schedules.find(s => s.name === place)}
            times={times}
            setTimes={setTimes}
          />
          <Grid item xs={2} display='flex' justifyContent={'space-around'} pt={5} flexWrap='wrap'>
            <Grid item>
              <Button variant='contained'>
                Update Week
              </Button>
            </Grid>
            <Grid item>
              <Button variant='contained' sx={{ maxWidth: '200px' }}>
                Update Year
              </Button>
            </Grid>
            <Grid item>
              <Button variant='contained' onClick={() => {
                fetchWeekSchedule(day);
                setSnackMeta({
                  open: true,
                  message: `Edits for ${place} cleared`,
                  color: 'success'
                });
              }}>
                Clear Edits
              </Button>
            </Grid>
            <Grid item>
              <Button variant='contained'>
                Delete Place
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Tooltip title='Add place' placement='left' arrow>
          <Fab color='primary'
            aria-label='add'
            sx={{
              margin: 0,
              top: 'auto',
              right: 50,
              bottom: 50,
              left: 'auto',
              position: 'fixed' }}>
            <Add />
          </Fab>
        </Tooltip>
        <Snackbar
          open={snackMeta.open}
          autoHideDuration={3500}
          onClose={closeSnack}
          action={snackAction}
          key='topright'
        >
          <Alert onClose={closeSnack} severity={snackMeta.severity} sx={{ width: '100%' }}>
            {snackMeta.message}
          </Alert>
        </Snackbar>
      </Box>
    );
  } else {
    return null;
  }
}
