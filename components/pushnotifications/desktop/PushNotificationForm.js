import { Autocomplete, Button, Checkbox, Paper, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useState } from 'react';

const InputField = styled(TextField)(() => ({
  width: '75%'
}));

export default function PushNotificationForm ({ clubs }) {
  // Form data
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [link, setLink] = useState('');
  const [club, setClub] = useState(clubs.length === 1 ? clubs[0] : '');

  // TODO: error on any time before current
  const [schedule, setSchedule] = useState(false);
  const [scheduledDateTime, setScheduledDateTime] = useState(dayjs().startOf('hour'));

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
          Send or Schedule a Push Notification
        </Typography>
        <InputField
          variant='outlined'
          label='Title'
          value={title}
          onChange={event => setTitle(event.target.value)}
          helperText={`Between 3 and 140 characters (${title.length}/140)`}
          error={title.length < 3 || title.length > 140}
          required
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
        />
        <InputField
          variant='outlined'
          label='Link'
          helperText='A valid HTTP link'
          value={link}
          onChange={event => setLink(event.target.value)}
        />
        <Autocomplete
          disablePortal
          id='club-selects'
          options={clubs}
          sx={{ width: '75%' }}
          renderInput={(params) => <TextField {...params} label='Organization' />}
          value={club}
          onChange={(_, newValue) => setClub(newValue)}
          disabled={clubs.length === 1}
        />
        <Stack direction='row' sx={{ width: '75%' }} justifyContent='space-around'>
          <Checkbox value={schedule} onChange={event => setSchedule(event.target.checked)} sx={{ height: '80%' }}/>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label='Scheduled Time'
            value={scheduledDateTime}
            onChange={(newValue) => {
              setScheduledDateTime(newValue);
            }}
            disabled={!schedule}
            shouldDisableTime={(timeValue, clockType) => {
              return clockType === 'minutes' && timeValue % 30 !== 0;
            }}
          />
        </Stack>
        <Button variant='contained'>
          { schedule ? 'Schedule' : 'Send'}
        </Button>
      </Stack>
    </Paper>
  );
}
