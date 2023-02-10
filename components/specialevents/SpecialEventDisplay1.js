import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { TextField } from '@mui/material';
import { withStyles } from '@mui/styles';
import { useState } from 'react';

const CustomTextField = withStyles({ root: { width: '100% !important' } })(TextField);

const SpecialEventDisplay = (props) => {
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
    participants: ''
  });

  const deleteCard = (index) => {
    axios.delete('/api/getinfo/specialEvents', { data: { id: index } })
      .then(() => { props.refresh(); });
  };

  const allowEdit = (index) => {
    setEditing({
      index: index,
      state: true
    });
    setCardState(() => ({
      id: props.eventList[index].id,
      title: props.eventList[index].title,
      sponsor: props.eventList[index].sponsor
    }));
  };

  const updateCard = (output, toChange) => {
    if (toChange === 'reset') {
      const data = { id: cardState.id, title: cardState.title, sponsor: cardState.sponsor };
      setCardState({
        id: '',
        type: '',
        sponsor: '',
        title: '',
        startDate: '2023-02-09',
        endDate: '2023-02-09',
        location: '',
        description: '',
        participants: ''
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
    } else if (toChange === 'sponsor') {
      setCardState(prev => ({ ...prev, sponsor: output.target.value }));
    }
  };

  const renderEvents = () => {
    const events = props.eventList;
    const listItems = events.map((item, index) => {
      return (<li key={index}>
        <Card sx={{ margin: 2 }}>
          <CardContent>
            {editing.state && index === editing.index ? (
              <>
                <CustomTextField
                  id='edit-title'
                  placeholder={item.title}
                  multiline
                  value={cardState.title}
                  onChange={(event) => updateCard(event, 'title')}
                />
                <CustomTextField
                  id='edit-sponsor'
                  placeholder={item.sponsor}
                  rowsMax={4}
                  multiline
                  value={cardState.sponsor}
                  onChange={(event) => updateCard(event, 'sponsor')}
                />
                <Button onClick={() => { updateCard(null, 'reset'); }}>Update</Button>
              </>
            ) : (
              <>
                <Typography sx={{ fontSize: 16 }} color="info.main" gutterBottom>
                  {item.title}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.primary">
                  Sponsor: {item.sponsor}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.primary">
                  Location: {item.startDate}
                </Typography>
                <CardActions>
                  <Button onClick={() => deleteCard(item.id)}>Delete</Button>
                  <Button onClick={() => allowEdit(index)}>Edit</Button>
                </CardActions>
              </>
            )}
          </CardContent>
        </Card>
      </li>);
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
