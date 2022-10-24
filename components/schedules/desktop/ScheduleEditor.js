import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Snackbar,
  Tooltip,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { weekStart, weekEnd, weekNum, packageScheduleData } from '../../../utils/dateUtils.mjs';
import CloseIcon from '@mui/icons-material/Close';

import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';

import WeekPicker from './WeekPicker.js';
import WeekEditor from './WeekEditor.js';
import DeleteConfirmation from './DeleteConfirmation.js';
import AddPlaceModal from './AddPlaceModal.js';
import Image from 'next/image.js';
import SpeedDialPicker from './SpeedDialPicker.js';

dayjs.extend(isBetweenPlugin);

const schedulesCache = {};

export default function ScheduleEditor () {
  const [schedules, setSchedules] = useState(undefined);
  const [placeIndex, setPlaceIndex] = useState(0);
  const [day, setDay] = useState(undefined);
  const [times, setTimes] = useState({});
  const [edit, setEdit] = useState(false);

  const [snackMeta, setSnackMeta] = useState({ open: false, message: undefined, severity: 'success' });

  const [deleteModal, setDeleteModal] = useState(false);
  const [addPlaceModal, setAddPlaceModal] = useState(false);

  const place = schedules ? schedules[placeIndex].name : undefined;

  const fetchWeekSchedule = (day) => {
    setDay(day);
    const week = weekNum(day);

    if (schedulesCache[week]) {
      const tempSchedule = JSON.clone(schedulesCache[week]);
      setSchedules(tempSchedule);
      setPlaceIndex(placeIndex ?? 0);
    } else {
      axios
        .get(`/api/schedules/${week}`)
        .then((response) => {
          schedulesCache[week] = JSON.clone(response.data);
          setSchedules(response.data);
          const tempPlaceIndex = placeIndex || 0;
          setPlaceIndex(tempPlaceIndex);
        });
    }
  };

  const patchWeekSchedule = () => {
    const empId = schedules[placeIndex].emp_id;
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
      });
  };

  const deactivatePlace = () => {
    setDeleteModal(false);
    const index = placeIndex;
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
      setPlaceIndex(0);
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
    fetchWeekSchedule(dayjs());
  }, []);

  useEffect(() => {
    setEdit(false);
  }, [placeIndex]);

  if (schedules) {
    return (
      <Box p={5} height='85vh'>
        <Grid container spacing={3} direction='column'>
          <Grid container directon='row' alignItems={'center'} justifyContent='space-between'>
            <Grid item xs={6}>
              <Typography
                fontSize={30}
                fontWeight={100}
              >
                <b>Current Week: {' '}</b>
                {weekStart(day).format('L')} {' - '}
                {weekEnd(day).format('L')}
              </Typography>
            </Grid>
            <Grid item xs={6} display='flex' flexDirection='row' justifyContent='flex-end'>
              <WeekPicker
                day={day}
                updateData={fetchWeekSchedule}
              />
            </Grid>
          </Grid>
          <Grid container direction={'row'} height='75vh' pt={3} >
            <Grid item xs={2} maxHeight='100%'>
              <List component={'div'} sx={{ maxHeight: '100%', overflow: 'auto' }}>
                {schedules.map((schedule, index) => {
                  const { name } = schedule;
                  return (
                    <ListItemButton
                      key={name}
                      selected={placeIndex === index}
                      onClick={() => setPlaceIndex(index)}
                    >
                      <ListItemText primary={name} />
                    </ListItemButton>
                  );
                })}
              </List>
            </Grid>
            <Divider orientation='vertical' />
            <Grid item xs={9.8} display='flex' flexDirection={'column'} justifyContent='space-evenly'>
              <WeekEditor
                schedule={schedules[placeIndex]}
                times={times}
                setTimes={setTimes}
                editMode={edit}
              />
              <Grid item display={'flex'} flexDirection='row' justifyContent={'space-evenly'} pt={4}>
                <Tooltip
                  title={
                    edit
                      ? `Clear all current edits for ${place}, 
                          restoring the schedule to how it was when the page was loaded.`
                      : 'Turn on edit mode to use this feature'
                  }
                >
                  <div>
                    <Button
                      variant='contained'
                      disabled={!edit}
                      onClick={() => {
                        fetchWeekSchedule(day);
                        setSnackMeta({
                          open: true,
                          message: `Edits for ${place} cleared`,
                          severity: 'success'
                        });
                      }}
                    >
                      Clear Edits
                    </Button>
                  </div>
                </Tooltip>
                <Tooltip title={
                  edit
                    ? `Apply changes for ${place} to just this week`
                    : 'Turn on edit mode to use this feature'
                }>
                  <div>
                    <Button
                      variant='contained'
                      disabled={!edit}
                      onClick={patchWeekSchedule}
                    >
                      Update Week
                    </Button>
                  </div>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <SpeedDialPicker
          editAction={() => setEdit(true)}
          deleteAction={() => setDeleteModal(true)}
          addAction={() => setAddPlaceModal(true)}
        />
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
          onCreate={(placeTimes) => {
            if (placeTimes) {
              // placeTimes only set if successful push to DB
              const temp = JSON.clone(schedules);
              temp.push(placeTimes);
              setSchedules(temp);
              setPlaceIndex(temp.length - 1);
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
