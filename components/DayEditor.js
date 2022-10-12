import { TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';

export default function DayEditor (props) {
  return (
    <td>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '120px'
      }}>
        <TimePicker
          value={props.start}
          label="Start time"
          onChange={(date) => props.callback(date, props.day, true)}
          style={{ width: '125px' }}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          value={props.end}
          label="End time"
          onChange={(date) =>
            props.callback(date, props.day, false)
          }
          style={{ width: '125px' }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </td>
  );
}
