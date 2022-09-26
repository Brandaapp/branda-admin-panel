import { useState, useEffect } from 'react';
import DayEditor from './DayEditor';
import { Button } from '@material-ui/core';
import { getProperDate } from '../utils/dateUtils';
import { mergeStartEndToSchedule } from '../utils/scheduleUtils';
import Confirmation from './Confirmation';
import Tooltip from '@material-ui/core/Tooltip';
import M from 'materialize-css';

import axios from 'axios';

const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
];

export default function WeekEditor (props) {
  const [state, setState] = useState({
    schedule: [],
    startTimes: [],
    endTimes: [],
    ver: -1
  });

  const [confirmDelete, setConfirmDelete] = useState(false);

  const updateOnChange = (date, hour, day, start) => {
    hour = hour.toLowerCase();
    const newDate = getProperDate(hour);
    const tempStart = state.startTimes;
    const tempEnd = state.endTimes;
    if (start) {
      tempStart[day] = newDate;
    } else {
      tempEnd[day] = newDate;
    }

    setState((prev) => ({ ...prev, startTimes: tempStart, endTimes: tempEnd }));
  };

  // override allows for setState not based on version number - used from reset()
  const update = (override) => {
    if (override || state.ver !== props.updateNum) {
      const tempSched = props.schedule;
      const tempStart = [];
      const tempEnd = [];

      for (const item in props.schedule) {
        if (item !== 'name' && item !== 'emp_id') {
          const tempTime = tempSched[item].split('-');
          tempStart[item] = getProperDate(tempTime[0]);
          tempEnd[item] = getProperDate(tempTime[1]);
        }
      }

      setState({
        startTimes: tempStart,
        endTimes: tempEnd,
        schedule: tempSched,
        ver: props.updateNum
      });
    }
  };

  const reset = () => {
    M.toast(
      'Updates for ' + state.schedule.name + ' cleared',
      2500,
      '#0d47a1 blue darken-4 rounded'
    );
    update(true); // want to manually override
  };

  useEffect(() => {
    update(false);
  }, [update]);

  const updateSchedule = async () => {
    const data = mergeStartEndToSchedule(
      state.schedule,
      state.startTimes,
      state.endTimes,
      days
    );
    await axios
      .patch(`/api/schedules/${props.weekNum}/${state.schedule.emp_id}`, data)
      .then((response) => {
        props.refresh();
        M.toast(
          state.schedule.name + ' updated',
          2500,
          'green rounded'
        );
      })
      .catch(() => {
        M.toast(
          'Unable to update ' + state.schedule.name,
          2500,
          'red rounded'
        );
      });
  };

  const remove = async () => {
    setConfirmDelete(false);
    const data = {
      id: props.schedule.emp_id,
      emp_id: props.schedule.emp_id
    };
    await axios
      .patch(`/api/places/delete`, data)
      .then(async (_response) => {
        await axios
          .patch(`/api/schedules/delete`, data)
          .then((response) => {
            props.onDeleteSuccess(state.schedule.name + ' deleted');
          })
          .catch((_e) =>
            props.onDeleteError(
              'ERROR: unable to delete ' + state.schedule.name
            )
          );
      })
      .catch((_e) =>
        props.onDeleteError('ERROR: unable to delete ' + state.schedule.name)
      );
  };

  return (
    <tr
      className="schedule-row"
      key={'_' + Math.random().toString(36).substr(2, 9)}
    >
      <td>{state.schedule.name}</td>

      {days.map((day) => {
        return (
          <DayEditor
            day={day}
            start={state.startTimes[day]}
            end={state.endTimes[day]}
            callback={updateOnChange}
            key={'_' + Math.random().toString(36).substr(2, 9)}
          />
        );
      })}

      <td
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          height: '150px'
        }}
      >
        <Tooltip
          title={`Updates the live schedule for ${state.schedule.name} for this week`}
          arrow
        >
          <Button
            variant="contained"
            style={{ backgroundColor: '#4caf50', color: 'white' }}
            onClick={updateSchedule}
          >
            Update
          </Button>
        </Tooltip>

        <Tooltip
          title={`Resets ${state.schedule.name}'s schedule to the state it was in when the page loaded`}
          arrow
        >
          <Button
            variant="contained"
            style={{ backgroundColor: '#1B4370', color: 'white' }}
            onClick={reset}
          >
            Clear Edits
          </Button>
        </Tooltip>
        <Tooltip
          title={`Deletes ${state.schedule.name} by making it inactive`}
          arrow
        >
          <Button
            variant="contained"
            style={{ backgroundColor: '#C11A1A', color: 'white' }}
            onClick={() => setConfirmDelete(true)}
          >
            Delete
          </Button>
        </Tooltip>
        <Confirmation
          name={state.schedule.name}
          open={confirmDelete}
          handleConfirm={remove}
          handleCancel={() => setConfirmDelete(false)}
        />
      </td>
    </tr>
  );
}
