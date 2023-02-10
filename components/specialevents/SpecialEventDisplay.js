import { withStyles } from '@mui/styles';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { TextField, Box, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios';
import moment from 'moment';

const CustomTextField = withStyles({ root: { width: '100% !important' } })(TextField);

const SpecialEventDisplay = (props) => {
  const [showDetail, setShowDetail] = useState({
    index: -1,
    state: false
  });
  const [editing, setEditing] = useState({
    index: -1,
    state: false
  });
  const [cardState, setCardState] = useState({
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

  const deleteCard = (id) => {
    axios.delete('/api/getinfo/specialEvents', { data: { id: id } })
      .then(() => { props.refresh(); });
  };

  const displayDetail = (index) => {
    setShowDetail({
      index: index,
      state: true
    });
  };

  const allowEdit = (index) => {
    setEditing({
      index: index,
      state: true
    });
    setCardState(() => ({
      id: props.eventList[index].id,
      type: props.eventList[index].type,
      sponsor: props.eventList[index].sponsor,
      title: props.eventList[index].title,
      startDate: props.eventList[index].startDate,
      endDate: props.eventList[index].endDate,
      location: props.eventList[index].location,
      description: props.eventList[index].description,
      participants: props.eventList[index].participants,
      price: props.eventList[index].price
    }));
  };

  const updateCard = (output, toChange) => {
    if (toChange === 'reset') {
      const data = {
        id: cardState.id,
        type: cardState.type,
        sponsor: cardState.sponsor,
        title: cardState.title,
        startDate: cardState.startDate,
        endDate: cardState.endDate,
        location: cardState.location,
        description: cardState.description,
        participants: cardState.participants,
        price: cardState.price
      };
      setCardState({
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
      setEditing({
        index: -1,
        state: false
      });
      axios({
        method: 'put',
        url: '/api/getinfo/specialEvents',
        data: data
      }).then(() => { props.refresh(); });
    } else if (toChange === 'title') {
      setCardState(prev => ({ ...prev, title: output.target.value }));
    } else if (toChange === 'type') {
      setCardState(prev => ({ ...prev, type: output.target.value }));
    } else if (toChange === 'sponsor') {
      setCardState(prev => ({ ...prev, sponsor: output.target.value }));
    } else if (toChange === 'location') {
      setCardState(prev => ({ ...prev, location: output.target.value }));
    } else if (toChange === 'description') {
      setCardState(prev => ({ ...prev, description: output.target.value }));
    } else if (toChange === 'participants') {
      setCardState(prev => ({ ...prev, participants: output.target.value }));
    } else if (toChange === 'price') {
      setCardState(prev => ({ ...prev, price: output.target.value }));
    }
  };

  const renderEvents = () => {
    const events = props.eventList;
    const listItems = events.map((item, index) => {
      const editingItem = editing.state && index === editing.index;
      const displayItem = showDetail.state && index === showDetail.index;
      const view1 = <>
        <Box spacing={12}>
          <Grid container direction='row'>
            <Grid px={2} item xs={12}>
              <div >
                <span className="input-label">Event title </span>
                <CustomTextField
                  id='edit-title'
                  placeholder={item.title}
                  rowsMax={4}
                  multiline
                  value={cardState.title}
                  onChange={(event) => updateCard(event, 'title')}
                />
              </div>
            </Grid>
          </Grid>
          <Grid container direction='row'>
            <Grid px={2} item xs={6}>
              <div >
                <span className="input-label">Event type</span>
                <CustomTextField
                  id='edit-type'
                  placeholder={item.type}
                  rowsMax={4}
                  multiline
                  value={cardState.type}
                  onChange={(event) => updateCard(event, 'type')}
                />
              </div>
            </Grid>
            <Grid px={2} item xs={6}>
              <div >
                <span className="input-label">Event Sponsor</span>
                <CustomTextField
                  id='edit-sponsor'
                  placeholder={item.sponsor}
                  rowsMax={4}
                  multiline
                  value={cardState.sponsor}
                  onChange={(event) => updateCard(event, 'sponsor')}
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
                    placeholder={item.startDate}
                    value={cardState.startDate}
                    onChange={(newValue) => setCardState(prev => ({ ...prev, startDate: newValue }))}
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
                    placeholder={item.endDate}
                    value={cardState.endDate}
                    onChange={(newValue) => setCardState(prev => ({ ...prev, endDate: newValue }))}
                    renderInput={(params) => <CustomTextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </Grid>
          </Grid>
          <Grid container direction='row'>
            <Grid px={2} item xs={4}>
              <div>
                <span className="input-label">Event Location</span>
                <CustomTextField
                  id='edit-location'
                  placeholder={item.location}
                  rowsMax={4}
                  multiline
                  value={cardState.location}
                  onChange={(event) => updateCard(event, 'location')}
                />
              </div>
            </Grid>
            <Grid px={2} item xs={4}>
              <div>
                <span className="input-label">Event Participants</span>
                <CustomTextField
                  id='edit-participants'
                  placeholder={item.participants}
                  rowsMax={4}
                  multiline
                  value={cardState.participants}
                  onChange={(event) => updateCard(event, 'participants')}
                />
              </div>
            </Grid>
            <Grid px={2} item xs={4}>
              <div>
                <span className="input-label">Event Price</span>
                <CustomTextField
                  id='edit-price'
                  placeholder={item.price}
                  rowsMax={4}
                  multiline
                  value={cardState.price}
                  onChange={(event) => updateCard(event, 'price')}
                />
              </div>
            </Grid>
          </Grid>
          <Grid container direction='row'>
            <Grid px={2} item xs={12}>
              <div>
                <span className="input-label">Event Description</span>
                <CustomTextField
                  id='edit-description'
                  placeholder={item.description}
                  rowsMax={4}
                  multiline
                  value={cardState.description}
                  onChange={(event) => updateCard(event, 'description')}
                />
              </div>
            </Grid>
          </Grid>
          <Grid px={2}>
            <Button onClick={() => updateCard(null, 'reset')}> Update</Button>
          </Grid>
        </Box>
      </>;
      const view2 = <>
        <Button
          style={{ fontSize: 10 }}
          onClick={() => setShowDetail({
            index: -1,
            state: false
          })}>Back to Previous Page</Button>
        <Typography sx={{ fontSize: 20 }} color="black" gutterBottom>
          {item.title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.primary">
          {moment(item.startDate).format('dddd, MMMM D, YYYY, h:mm a')}
          -
          {moment(item.endDate).format('h:mm a')}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.primary">
          Location: {item.location}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.primary">
          Sponsor(s): {item.sponsor}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.primary">
          Price: {item.price}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.primary">
          About: {item.description}
        </Typography>
      </>;
      const view3 = <>
        <Typography sx={{ fontSize: 16 }} color="info.main" gutterBottom>
          {item.title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.primary">
          {moment(item.startDate).format('dddd, MMMM D, YYYY, h:mm a')}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.primary">
          Sponsor(s): {item.sponsor}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.primary">
          Location: {item.location}
        </Typography>
        <Button onClick={() => deleteCard(item.id)}>Delete</Button>
        <Button onClick={() => allowEdit(index)}>Edit</Button>
        <Button onClick={() => displayDetail(index)}>Show Detail</Button>
      </>;
      return (<li key={index}>
        <Card sx={{ margin: 2 }}>
          <CardContent>
            {editingItem ? view1 : (displayItem ? view2 : view3)}
          </CardContent>
        </Card >
      </li >);
    });
    return (
      <>
        <Typography sx={{ fontSize: 30, textAlign: 'center' }}>
          Special Events
        </Typography>
        <ul>{listItems}</ul>
      </>
    );
  };

  return (
    <div >
      {renderEvents()}
    </div>
  );
};

export default SpecialEventDisplay;
