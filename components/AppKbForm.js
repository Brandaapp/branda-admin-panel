import { useState } from 'react';
import { TextField } from '@mui/material';
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { v4 as uuidv4 } from 'uuid';

const CustomTextField = withStyles({ root: { width: '100% !important' } })(TextField);

const AppKbForm = (props) => {
  const [kbState, setKBState] = useState({
    id: '',
    title: '',
    content: ''
  });

  const handleChange = (output, toChange) => {
    if (toChange === 'reset') {
      setKBState({
        title: '',
        content: ''
      });
    } else if (toChange === 'title') {
      setKBState(prev => ({ ...prev, title: output.target.value }));
    } else if (toChange === 'content') {
      setKBState(prev => ({ ...prev, content: output.target.value }));
    }
  };

  return (
    <div className="appkb-card">
      <Typography sx={{ fontSize: 16, textAlign: 'center' }} color='info.main'>
        Add App Knowledge Base
      </Typography>
      <div style={{ margin: 4 }}>
        <span className="input-label">Title</span>
        <CustomTextField
          id='title'
          placeholder="Enter title"
          rowsMax={4}
          multiline
          value={kbState.title}
          onChange={(event) => handleChange(event, 'title')}
        />
      </div>
      <div style={{ margin: 4 }}>
        <span className="input-label">Content</span>
        <CustomTextField
          id='content'
          placeholder="Enter content"
          rowsMax={4}
          multiline
          value={kbState.content}
          onChange={(event) => handleChange(event, 'content')}
        />
      </div>
      <button className="btn waves-effect waves-light" type="submit"
        name="action" onClick={() => {
          kbState.id = uuidv4();
          props.create(kbState);
          handleChange(null, 'reset');
        }}
        style={{ backgroundColor: '#1B4370', color: 'white', marginTop: '40px', padding: '0 1.5rem' }}>
        Submit
        <i className="material-icons right">send</i>
      </button>
    </div >
  );
};

export default AppKbForm;
