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
import { useEffect, useState } from 'react';

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

export default function AddShuttleModal ({
  routeName,
  date,
  open,
  setOpen,
  setSnackMeta,
  propagateShuttle
}) {
  const [shuttle, setShuttle] = useState(shuttles[0]);
  const [start, setStart] = useState(dayjs(date).startOf('D'));
  const [end, setEnd] = useState(dayjs(date).endOf('D'));

  useEffect(() => {
    setStart(dayjs(date).startOf('D'));
    setEnd(dayjs(date).endOf('D'));
  }, [date]);

  const notTodayOrTomorrow = day => {
    const today = dayjs(date);
    return !today.isSame(dayjs(day), 'day') && !today.add(1, 'day').isSame(dayjs(day), 'day');
  };

  const close = () => {
    setShuttle(shuttles[0]);
    setOpen(false);
    setStart(dayjs(date).startOf('D'));
    setEnd(dayjs(date).endOf('D'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify({
      selectedShuttleName: shuttle.text,
      selectedShuttleID: shuttle.value,
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

  const addShuttle = () => {
    axios.post(`/api/shuttles/${dayjs(date).format()}`, {
      start,
      end,
      ID: dayjs().valueOf(),
      busID: shuttle.value,
      busName: shuttle.text,
      route: routeName
    }).then(response => {
      setSnackMeta({
        open: true,
        severity: 'success',
        message: `Successfully added ${shuttle.text} to the ${routeName} route on ${date.format('L')}`
      });
      close();
      propagateShuttle(response.data, routeName);
    }).catch(() => {
      setSnackMeta({
        open: true,
        severity: 'error',
        message: 'Error adding shuttle'
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
          {/* <Typography id='modal-modal-title' variant='h4' textAlign='center' pb={2}>
            Add Shuttle
          </Typography> */}
          <Typography id='modal-modal-title' variant='subtitle1' fontWeight={1}>
            Choose a shuttle to add to the {routeName} route.
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
                  shuttles.map(bus => <MenuItem value={bus} key={bus.value}>{bus.text}</MenuItem>)
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
            <Button size='small' onClick={addShuttle} variant='outlined' color='success'>Add Shuttle</Button>
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
