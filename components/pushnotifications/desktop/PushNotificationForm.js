import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { DateTimePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';

import { isValidHttpUrl } from '../../../utils/httpUtils.mjs';

const InputField = styled(TextField)(() => ({
  width: '75%'
}));

const now = dayjs();

export default function PushNotificationForm ({ clubs, setSnackMeta, author, emitter, mobile }) {
  // Form data
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [link, setLink] = useState('');
  const [club, setClub] = useState(clubs.length === 1 ? clubs[0] : '');

  const [schedule, setSchedule] = useState(false);
  const [scheduledDateTime, setScheduledDateTime] = useState(now.hour(now.hour() + 1).startOf('hour'));

  const handleSubmit = () => {
    if (schedule) {
      const payload = {
        author,
        title,
        body,
        link,
        to: club,
        sendOn: scheduledDateTime.toDate()
      };

      axios.post('/api/pushnotifications/schedule', payload)
        .then(response => {
          setSnackMeta({
            open: true,
            message: 'Successfully scheduled push notification',
            severity: 'success'
          });

          clearForm();

          emitter.emit('scheduled', {
            ...payload,
            _id: response.data._id
          });
        }).catch((e) => {
          setSnackMeta({
            open: true,
            message: 'Error scheduling push notification',
            severity: 'error'
          });
        });
    } else {
      const payload = {
        title,
        message: body,
        link,
        to: club
      };
      axios.post('/api/pushnotifications/send', payload)
        .then(() => {
          setSnackMeta({
            open: true,
            message: 'Sent push notification',
            severity: 'success'
          });
          clearForm();
        }).catch(() => {
          setSnackMeta({
            open: true,
            message: 'Error sending push notification',
            severity: 'error'
          });
        });
    }
  };

  const clearForm = () => {
    setTitle('');
    setBody('');
    setLink('');
    setClub('');
  };

  const validForm = () => {
    return (
      (title.length >= 3 && title.length <= 140) &&
      body.length >= 5 &&
      (link === '' || isValidHttpUrl(link)) &&
      (club && club !== '')
    );
  };

  const validScheduleForm = () => {
    return validForm() && validDate();
  };

  const validDate = () => {
    return scheduledDateTime.isAfter(dayjs());
  };

  return (
    <Paper
      elevation={5}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        p: 5
      }}>
      <Stack spacing={4} alignItems='center'>
        <Typography fontSize={30} textAlign='center'>
          Send {mobile ? null : 'or Schedule'} a Push Notification
        </Typography>
        <InputField
          variant='outlined'
          label='Title'
          value={title}
          onChange={event => setTitle(event.target.value)}
          helperText={`Between 3 and 140 characters (${title.length}/140)`}
          error={title.length < 3 || title.length > 140}
          required
          sx={{
            width: mobile ? '100%' : '75%'
          }}
        />
        <InputField
          variant='outlined'
          label='Body'
          multiline
          value={body}
          onChange={event => setBody(event.target.value)}
          helperText={`More than 5 characters`}
          error={body.length < 5}
          required
          sx={{
            width: mobile ? '100%' : '75%'
          }}
        />
        <InputField
          variant='outlined'
          label='Link'
          helperText={
            link !== '' && !isValidHttpUrl(link)
              ? 'If you want to enter a link, please make sure it is a valid HTTP link'
              : null
          }
          value={link}
          onChange={event => setLink(event.target.value)}
          error={link !== '' && !isValidHttpUrl(link)}
          sx={{
            width: mobile ? '100%' : '75%'
          }}
        />
        <Autocomplete
          disablePortal
          id='club-selects'
          options={clubs}
          sx={{ width: mobile ? '100%' : '75%' }}
          renderInput={(params) => <TextField {...params} label='Organization' />}
          value={club}
          onChange={(_, newValue) => setClub(newValue)}
          disabled={clubs.length === 1}
        />
        {
          mobile
            ? <Stack width={'100%'}>
              <Button
                variant='contained'
                onClick={handleSubmit}
                disabled={
                  !validForm()
                }
              >
              Send
              </Button>
              <Typography mt={3.5} variant='subtitle2' fontWeight={1} textAlign='center'>
                To schedule a push notification, please revisit this page on a desktop device.
              </Typography>
            </Stack>
            : <Stack direction='row' sx={{ width: '100%' }} justifyContent='space-between' alignItems='center'>
              <FormControl sx={{ width: '40%' }}>
                <InputLabel>Delivery</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={schedule}
                  label='Delivery'
                  onChange={event => setSchedule(event.target.value)}
                >
                  <MenuItem value={false}>Send Now</MenuItem>
                  <MenuItem value={true}>Schedule</MenuItem>
                </Select>
              </FormControl>
              <Stack sx={{ width: '50%' }} spacing={3}>
                <DateTimePicker
                  renderInput={(props) =>
                    <TextField
                      {...props}
                      error={schedule && !validDate()}
                      helperText={schedule && !validDate()
                        ? 'Please enter a date and time after the current moment' : ''}
                    />
                  }
                  label='Send On'
                  value={scheduledDateTime}
                  onChange={(newValue) => {
                    setScheduledDateTime(newValue);
                  }}
                  disabled={!schedule}
                  shouldDisableTime={(timeValue, clockType) => {
                    return clockType === 'minutes' && timeValue % 30 !== 0;
                  }}
                />
                <Button
                  variant='contained'
                  onClick={handleSubmit}
                  disabled={
                    schedule
                      ? !validScheduleForm()
                      : !validForm()
                  }
                >
                  { schedule ? 'Schedule' : 'Send'}
                </Button>
              </Stack>
            </Stack>
        }
      </Stack>
    </Paper>
  );
}
