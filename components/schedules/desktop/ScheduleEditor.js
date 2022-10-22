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
import { weekStart, weekEnd, weekNum, packageScheduleData } from '../../../utils/dateUtils.mjs';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';

import WeekPicker from './WeekPicker.js';
import WeekEditor from './WeekEditor.js';
import DeleteConfirmation from './DeleteConfirmation.js';
import AddPlaceModal from './AddPlaceModal.js';
import Image from 'next/image.js';

dayjs.extend(isBetweenPlugin);

const schedulesCache = {};

export default function ScheduleEditor () {
  const [schedules, setSchedules] = useState(undefined);
  const [place, setPlace] = useState('');
  const [day, setDay] = useState('');
  const [times, setTimes] = useState({});

  const [snackMeta, setSnackMeta] = useState({ open: false, message: undefined, severity: 'success' });

  const [sendingData, setSendingData] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [addPlaceModal, setAddPlaceModal] = useState(false);

  const fetchWeekSchedule = (day) => {
    setDay(day);
    const week = weekNum(day);

    if (schedulesCache[week]) {
      const tempSchedule = JSON.clone(schedulesCache[week]);
      setSchedules(tempSchedule);
      setPlace(tempSchedule[0].name);
    } else {
      // setSchedules(undefined);
      axios
        .get(`/api/schedules/${week}`)
        .then((response) => {
          schedulesCache[week] = JSON.clone(response.data);
          setSchedules(response.data);
          const tempPlace = place || response.data[0].name;
          setPlace(tempPlace);
        });
    }
  };

  const patchWeekSchedule = () => {
    setSendingData(true);
    const empId = schedules.find(schedule => schedule.name === place).emp_id;
    const week = weekNum(day);
    const body = packageScheduleData(times);
    axios.patch(`/api/schedules/${week}/${empId}`, body)
      .then(() => {
        setSnackMeta({
          open: true,
          severity: 'success',
          message: `Successfully updated ${place}`
        });
      })
      .catch(() => {
        setSnackMeta({
          open: true,
          severity: 'error',
          message: `Error updating ${place}`
        });
      })
      .finally(() => {
        setSendingData(false);
      });
  };

  const deactivatePlace = () => {
    setDeleteModal(false);
    setSendingData(true);
    const index = schedules.findIndex(schedule => schedule.name === place);
    const empId = schedules[index].emp_id;
    axios.patch(`/api/schedules/delete`, {
      emp_id: empId
    }).then(() => {
      setSnackMeta({
        open: true,
        severity: 'success',
        message: `Successfully deleted ${place}`
      });
      const tempSchedules = JSON.clone(schedules);
      tempSchedules.splice(index, 1);
      setPlace(tempSchedules[0].name);
      setSchedules(tempSchedules);
      Object.keys(schedulesCache).forEach(week => {
        schedulesCache[week].splice(index, 1);
      });
      // TODO: not considering edge case when there are no schedules left. Not a problem for now.
    }).catch(() => {
      setSnackMeta({
        open: true,
        severity: 'error',
        message: `Error deleting ${place}`
      });
    }).finally(() => {
      setSendingData(false);
    });
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
        <CloseIcon fontSize="small" />
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
            <Grid item xs={2}>
              <WeekPicker
                day={day}
                updateData={fetchWeekSchedule}
              />
            </Grid>
            <Grid item xs={6} textAlign='center'>
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
          <Grid item sx={{ mt: 10 }}>
            <WeekEditor
              schedule={schedules.find(s => s.name === place)}
              times={times}
              setTimes={setTimes}
            />
          </Grid>
          <Grid item xs={2} display='flex' justifyContent={'space-around'} mt={5} flexWrap='wrap'>
            <Grid item>
              <Tooltip title='Apply changes to just this week' >
                <div>
                  <Button variant='contained' sx={{ backgroundColor: '#1B4370' }}
                    onClick={patchWeekSchedule}
                    disabled={sendingData}
                  >
                  Update Week
                  </Button>
                </div>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip
                title={`Clear all current edits for ${place}, 
                restoring the schedule to how it was when the page was loaded.`}
              >
                <div>
                  <Button variant='contained' sx={{ backgroundColor: '#1B4370' }} onClick={() => {
                    fetchWeekSchedule(day);
                    setSnackMeta({
                      open: true,
                      message: `Edits for ${place} cleared`,
                      severity: 'success'
                    });
                  }}
                  disabled={sendingData}
                  >
                  Clear Edits
                  </Button>
                </div>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={`Delete ${place}`} >
                <div>
                  <Button variant='contained' sx={{ backgroundColor: '#1B4370' }}
                    disabled={sendingData}
                    onClick={() => setDeleteModal(true)}
                  >
                  Delete Place
                  </Button>
                </div>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <Tooltip title='Add place' placement='left' >
          <Fab
            color='primary'
            aria-label='add'
            sx={{
              margin: 0,
              top: 'auto',
              right: 50,
              bottom: 50,
              left: 'auto',
              position: 'fixed',
              backgroundColor: '#1B4370'
            }}
            onClick={() => setAddPlaceModal(true)}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        <Snackbar
          open={snackMeta.open}
          autoHideDuration={3500}
          onClose={closeSnack}
          action={snackAction}
          key='topright'
          sx={{ maxWidth: 600 }}
        >
          <Alert onClose={closeSnack} severity={snackMeta.severity} sx={{ width: '100%' }}>
            {snackMeta.message}
          </Alert>
        </Snackbar>
        <DeleteConfirmation
          open={deleteModal}
          setOpen={setDeleteModal}
          place={place}
          onDelete={deactivatePlace}
        />
        <AddPlaceModal
          open={addPlaceModal}
          setOpen={setAddPlaceModal}
          setSnackMeta={setSnackMeta}
          onCreate={(placeName, placeTimes) => {
            if (placeTimes) {
              // placeTimes only set if successful push to DB
              const temp = JSON.clone(schedules);
              temp.push(placeTimes);
              setSchedules(temp);
              setPlace(placeName);
              Object.keys(schedulesCache).forEach(week => {
                schedulesCache[week].push(JSON.clone(placeTimes));
              });
            }
          }}
        />
      </Box>
    );
  } else {
    return (
      <Box height='90vh' display={'flex'} flexDirection='column' alignItems={'center'} justifyContent='center'>
        <Image alt='' src="/branda-admin-loading-gif.gif" width={280} height={280} />
      </Box>
    );
  }
}
