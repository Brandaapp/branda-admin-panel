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

const AppKbDisplay = (props) => {
  const [editing, setEditing] = useState({
    index: -1,
    state: false
  });
  const [cardState, setCardState] = useState({
    title: '',
    content: ''
  });

  const deleteCard = (title) => {
    axios.delete('/api/getinfo/kb/getAppKb', { data: { title: title } })
      .then(() => { props.refresh(); });
  };

  const allowEdit = (index) => {
    setEditing({
      index: index,
      state: true
    });
  };

  const updateCard = (output, toChange) => {
    if (toChange === 'reset') {
      const data = { title: cardState.title, content: cardState.content };
      setCardState({
        title: '',
        content: ''
      });
      setEditing({
        index: -1,
        state: false
      });
      axios({
        method: 'put',
        url: '/api/getinfo/kb/getAppKb',
        data: data
      }).then(() => { props.refresh(); });
    } else if (toChange === 'title') {
      setCardState(prev => ({ ...prev, title: output.target.value }));
    } else if (toChange === 'content') {
      setCardState(prev => ({ ...prev, content: output.target.value }));
    }
  };

  const renderAppKbs = () => {
    const kbs = props.appKbs;
    const listItems = kbs.map((item, index) => {
      return (<li key={index}>
        <Card sx={{ minWidth: 275, margin: 2 }}>
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
                  id='edit-content'
                  placeholder={item.content}
                  rowsMax={4}
                  multiline
                  value={cardState.content}
                  onChange={(event) => updateCard(event, 'content')}
                />
                <Button onClick={() => updateCard(null, 'reset')}>Update</Button>
              </>
            ) : (
              <>
                <Typography sx={{ fontSize: 16 }} color="info.main" gutterBottom>
                  {item.title}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.primary">
                  {item.content}
                </Typography>
                <CardActions>
                  <Button onClick={() => deleteCard(item.title)}>Delete</Button>
                  <Button onClick={() => allowEdit(index)}>Edit</Button>
                </CardActions>
              </>
            )}
          </CardContent>
        </Card>
      </li>);
    });
    return (<ul>{listItems}</ul>);
  };

  return (
    <div >
      {renderAppKbs()}
    </div>
  );
};

export default AppKbDisplay;
