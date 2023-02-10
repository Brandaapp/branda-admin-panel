import { useState } from 'react';
import { TextField, Box, Grid } from '@mui/material';
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { v4 as uuidv4 } from 'uuid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const CustomTextField = withStyles({ root: { width: '100% !important' } })(TextField);

const SpecialEventForm = (props) => {
  const [eventState, setEventState] = useState({
    id: '',
    type: '',
    sponsor: '',
    title: '',
    startDate: '2023-02-09',
    endDate: '2023-02-09',
    location: '',
    description: '',
    participants: '',
    price: ''
  });

  const handleChange = (output, toChange) => {
    if (toChange === 'reset') {
      setEventState({
        id: '',
        type: '',
        sponsor: '',
        title: '',
        startDate: '',
        endDate: '',
        location: '',
        description: '',
        participants: '',
        price: ''
      });
    } else if (toChange === 'title') {
      setEventState(prev => ({ ...prev, title: output.target.value }));
    } else if (toChange === 'type') {
      setEventState(prev => ({ ...prev, type: output.target.value }));
    } else if (toChange === 'sponsor') {
      setEventState(prev => ({ ...prev, sponsor: output.target.value }));
    } else if (toChange === 'location') {
      setEventState(prev => ({ ...prev, location: output.target.value }));
    } else if (toChange === 'description') {
      setEventState(prev => ({ ...prev, description: output.target.value }));
    } else if (toChange === 'participants') {
      setEventState(prev => ({ ...prev, participants: output.target.value }));
    } else if (toChange === 'price') {
      setEventState(prev => ({ ...prev, price: output.target.value }));
    }
  };

  return (
    <div className="specialEvent-card">
      <Typography sx={{ fontSize: 30, textAlign: 'center' }} >
        Add Special Event
      </Typography>
      <Box spacing={12}>
        <Grid container direction='row'>
          <Grid px={2} item xs={12}>
            <div >
              <span className="input-label">Event title </span>
              <CustomTextField
                id='title'
                placeholder="Enter event title"
                rowsMax={4}
                multiline
                value={eventState.title}
                onChange={(event) => handleChange(event, 'title')}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container direction='row'>
          <Grid px={2} item xs={6}>
            <div >
              <span className="input-label">Event type</span>
              <CustomTextField
                id='type'
                placeholder="Enter event type"
                rowsMax={4}
                multiline
                value={eventState.type}
                onChange={(event) => handleChange(event, 'type')}
              />
            </div>
          </Grid>
          <Grid px={2} item xs={6}>
            <div >
              <span className="input-label">Event Sponsor</span>
              <CustomTextField
                id='sponsor'
                placeholder="Enter event sponsor"
                rowsMax={4}
                multiline
                value={eventState.sponsor}
                onChange={(event) => handleChange(event, 'sponsor')}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container direction='row'>
          <Grid px={2} item xs={6}>
            <div>
              <span className="input-label">Event Start Time</span>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  value={eventState.startDate}
                  onChange={(newValue) => setEventState(prev => ({ ...prev, startDate: newValue }))}
                  renderInput={(params) => <CustomTextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </Grid>
          <Grid px={2} item xs={6}>
            <div>
              <span className="input-label">Event End Time</span>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  value={eventState.endDate}
                  onChange={(newValue) => setEventState(prev => ({ ...prev, endDate: newValue }))}
                  renderInput={(params) => <CustomTextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </Grid>
        </Grid>
        <Grid container direction='row'>
          <Grid px={2} item xs={4}>
            <div style={{ margin: 2 }}>
              <span className="input-label">Event Location</span>
              <CustomTextField
                id='location'
                placeholder="Enter event location"
                rowsMax={4}
                multiline
                value={eventState.location}
                onChange={(event) => handleChange(event, 'location')}
              />
            </div>
          </Grid>
          <Grid px={2} item xs={4}>
            <div style={{ margin: 2 }}>
              <span className="input-label">Event Participants</span>
              <CustomTextField
                id='participants'
                placeholder="Enter event participants"
                rowsMax={4}
                multiline
                value={eventState.participants}
                onChange={(event) => handleChange(event, 'participants')}
              />
            </div>
          </Grid>
          <Grid px={2} item xs={4}>
            <div style={{ margin: 2 }}>
              <span className="input-label">Event Price</span>
              <CustomTextField
                id='price'
                placeholder="Enter event price"
                rowsMax={4}
                multiline
                value={eventState.price}
                onChange={(event) => handleChange(event, 'price')}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container direction='row'>
          <Grid px={2} item xs={12}>
            <div >
              <span className="input-label">Event Description</span>
              <CustomTextField
                id='description'
                placeholder="Enter event description"
                rowsMax={4}
                multiline
                value={eventState.description}
                onChange={(event) => handleChange(event, 'description')}
              />
            </div>
          </Grid>
        </Grid>
        <Grid px={2}>
          <button className="btn waves-effect waves-light" type="submit"
            name="action" onClick={() => {
              eventState.id = uuidv4();
              props.create(eventState);
              handleChange(null, 'reset');
            }}
            style={{ backgroundColor: '#1B4370', color: 'white', marginTop: '40px', padding: '0 1.5rem' }}>
            Submit
            <i className="material-icons right">send</i>
          </button>
        </Grid>
      </Box>
    </div >
  );
};

export default SpecialEventForm;
