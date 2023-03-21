import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useState } from 'react';

import BugReportIcon from '@mui/icons-material/BugReport';

import shuttles from '../shuttleTags.json';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  boxShadow: 24,
  px: 3,
  pt: 3,
  flexDirection: 'column',
  height: '50vh',
  width: '45vw'
};

export default function EditShuttleModal ({
  routeName,
  date,
  open,
  setOpen,
  setSnackMeta,
  initialShuttle,
  initialStart,
  initialEnd,
  propagateRemove,
  propagateUpdate
}) {
  const [shuttle, setShuttle] = useState(initialShuttle.text);
  const [start, setStart] = useState(dayjs(initialStart));
  const [end, setEnd] = useState(dayjs(initialEnd));

  const notTodayOrTomorrow = day => {
    const today = dayjs(initialStart).startOf('day');
    return !today.isSame(dayjs(day), 'day') && !today.add(1, 'day').isSame(dayjs(day), 'day');
  };

  const close = () => {
    setShuttle(initialShuttle.text);
    setOpen(false);
    setStart(dayjs(initialStart));
    setEnd(dayjs(initialEnd));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify({
      selectedShuttleName: shuttle,
      selectedShuttleID: shuttles.find(bus => bus.text === shuttle).value,
      currentDate: dayjs(date).format(),
      startTime: start.format(),
      endTime: end.format(),
      route: routeName
    })).then(() => {
      setSnackMeta({
        open: true,
        severity: 'success',
        message: 'Copied info to clipboard'
      });
    }).catch(() => {
      setSnackMeta({
        open: true,
        severity: 'error',
        message: 'Error copying info to clipboard'
      });
    });
  };

  const deleteShuttle = () => {
    axios.delete(`api/shuttles/${dayjs(date).format()}/${initialShuttle.ID}`)
      .then(() => {
        setSnackMeta({
          open: true,
          severity: 'success',
          message: `Deleted shuttle ${shuttle} from the ${routeName} route.`
        });
        close();
        propagateRemove();
      }).catch(() => {
        setSnackMeta({
          open: true,
          severity: 'error',
          message: `Error deleting shuttle ${shuttle.text} from the ${routeName} route.`
        });
      });
  };

  const updateShuttle = () => {
    const data = {
      busID: shuttles.find(bus => bus.text === shuttle).value,
      busName: shuttle,
      start: start.format(),
      end: end.format()
    };

    axios.patch(`api/shuttles/${dayjs(date).format()}/${initialShuttle.ID}`, data)
      .then(() => {
        close();
        propagateUpdate(data, initialShuttle.text);
        setSnackMeta({
          open: true,
          severity: 'success',
          message: `Updated shuttle.`
        });
      })
      .catch(() => {
        setSnackMeta({
          open: true,
          severity: 'error',
          message: `Error updating shuttle.`
        });
      });
  };

  return (
    <Modal
      open={open}
      onClose={close}
    >
      <Card sx={style}>
        <CardContent>
          <Typography id='modal-modal-title' variant='subtitle1' fontWeight={1}>
            Update this shuttle on the {routeName} route.
          </Typography>
          <Stack spacing={3} mt={3}>
            <FormControl>
              <InputLabel id='shuttle-select-label'>Shuttle</InputLabel>
              <Select
                labelId='shuttle-select-label'
                id='shuttle-select'
                value={shuttle}
                label='Shuttle'
                onChange={event => setShuttle(event.target.value)}
              >
                {
                  shuttles.map(bus => <MenuItem value={bus.text} key={bus.value}>{bus.text}</MenuItem>)
                }
              </Select>
            </FormControl>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label='Start Time'
              value={start}
              onChange={(newValue) => {
                setStart(newValue);
              }}
              shouldDisableDate={notTodayOrTomorrow}
            />
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label='End Time'
              value={end}
              onChange={(newValue) => {
                setEnd(newValue);
              }}
              shouldDisableDate={notTodayOrTomorrow}
            />
          </Stack>
        </CardContent>
        <CardActions sx={{ pt: 5 }}>
          <Stack spacing={4} direction='row' justifyContent='flex-end' width='100%'>
            <Button size='small' onClick={updateShuttle} variant='outlined' color='success'>Update</Button>
            <Button size='small' onClick={deleteShuttle} variant='outlined' color='error'>Delete</Button>
            <Button
              size='small'
              startIcon={<BugReportIcon />}
              onClick={copyToClipboard}
              variant='outlined'
              color='primary'
            >
              Copy Info to Clipboard
            </Button>
            <Button size='small' onClick={close}>Cancel</Button>
          </Stack>
        </CardActions>
      </Card>
    </Modal>
  );
}
