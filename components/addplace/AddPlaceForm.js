import { useState } from 'react';
import createTable from '../../utils/renderUtils/tableGenerator';
import {
  getDefaultWeekTimes,
  getProperDate,
  populateWeeksArray
} from '../../utils/dateUtils';
import { Tooltip, TextField, Button, MenuItem, FormControl, Select } from '@mui/material';
import DayEditor from '../DayEditor';

import axios from 'axios';

import { useStyles } from './styles';
import constants from './constants';

const defaultTimes = getDefaultWeekTimes();

export default function AddPlaceForm (props) {
  const classes = useStyles();

  const [state, setState] = useState({
    name: '',
    group: 'Dining',
    times: defaultTimes,
    row: undefined // cache of row components
  });

  const [sending, setSending] = useState(false);

  const { onSubmit, onError } = props;
  const options = constants.options;
  const labels = constants.labels;
  const days = constants.days;

  const post = async () => {
    setSending(true);

    const data = {
      name: state.name,
      group: state.group
    };

    const { weeks, json } = populateWeeksArray(state.times);

    axios
      .post(`api/places/add`, data)
      .then((response) => {
        const empId = response.data._id;
        axios
          .post(`api/schedules`, { ...data, emp_id: empId, weeks, ...json })
          .then((_response) => {
            setSending(false);
            onSubmit(state.name + ' added as a new place.');
          })
          .catch((err) => onError(`Failed to add place: ${err.response.data}`));
      })
      .catch((err) => onError(`Failed to add place: ${err.response.data}`));
  };

  const updateTimes = (_date, hour, day, start) => {
    hour = hour.toLowerCase().replace(/\s/g, '');
    const tempTimes = state.times;
    tempTimes[day][start ? 'start' : 'end'] = hour;
    setState((prev) => ({ ...prev, times: tempTimes, row: undefined }));
  };

  const createRow = () => {
    const row = days.map((day) => {
      return (
        <DayEditor
          day={day}
          start={getProperDate(state.times[day].start)}
          end={getProperDate(state.times[day].end)}
          callback={updateTimes}
          key={'_' + Math.random().toString(36).substr(2, 9)}
        />
      );
    });

    setState((prev) => ({ ...prev, row: row }));

    return row;
  };

  return (
    <div className={classes.paper}>
      <h4 style={{ color: '#1B4370' }}>Add Place</h4>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{ paddingBottom: '10px', color: '#1B4370', fontSize: '20px' }}
        >
          Place Name
        </div>
        <TextField
          id="name"
          placeholder="Place Name"
          variant="outlined"
          type="text"
          required
          onChange={(event) => {
            setState((prev) => ({ ...prev, name: event.target.value }));
          }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{ paddingBottom: '10px', color: '#1B4370', fontSize: '20px' }}
        >
          Group
        </div>
        <FormControl>
          <Select
            labelId="group-select-label"
            id="group-select"
            value={state.group}
            onChange={(event) =>
              setState((prev) => ({ ...prev, group: event.target.value }))
            }
            variant="outlined"
          >
            {options.map((group) => (
              <MenuItem key={group} value={group}>
                {group}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{ paddingBottom: '10px', color: '#1B4370', fontSize: '20px' }}
        >
          Enter Hours
        </div>
        {createTable(
          { width: '1400 px' },
          labels,
          <tr>{state.row || createRow()}</tr>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Tooltip
          title={
            !state.name
              ? 'Please provide a place name'
              : sending
                ? 'New place is being added'
                : 'Add a new place'
          }
          arrow
        >
          <span style={{ width: '20%' }}>
            <Button
              style={{
                backgroundColor: !state.name || sending ? '#5482B6' : '#1B4370',
                color: 'white',
                width: '100%'
              }}
              onClick={post}
              disabled={!state.name || sending}
            >
              {sending ? 'Adding new place...' : 'Add new place'}
            </Button>
          </span>
        </Tooltip>
      </div>
    </div>
  );
}
