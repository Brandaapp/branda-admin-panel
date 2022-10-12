import { useState, useEffect } from 'react';
import { weekStart, weekEnd, weekNum } from '../utils/dateUtils';
import WeekPicker from './WeekPicker';
import { Button, Popover } from '@mui/material';
import Image from 'next/image';
import axios from 'axios';

export default function ScheduleView (props) {
  const [state, setState] = useState({
    weekStart: null,
    weekEnd: null,
    weekNum: -1,
    scheduleData: []
  });
  const [anchorEl, setAnchorEl] = useState(null);

  async function setWeek (start, end, num) {
    await axios
      .get(`/api/schedules/${num}`)
      .then((response) => {
        setState({
          weekStart: start,
          weekEnd: end,
          weekNum: num,
          scheduleData: response.data
        });
      });
    if (!props.dataFetched) props.setDataFetched(true);
  }

  useEffect(() => {
    if (state.weekNum === -1) {
      const day = new Date();
      setWeek(weekStart(day), weekEnd(day), weekNum(day));
    }
  });

  function renderRows () {
    const weeks = [];
    state.scheduleData.forEach((schedule) => {
      weeks.unshift(<tr
        className="schedule-row"
        key={'_' + Math.random().toString(36).substr(2, 9)}
      >
        <td>{schedule.name}</td>
        <td>
          {schedule.monday === '11:00am-11:01am' ||
            schedule.monday === '11:00pm-11:01pm'
            ? 'Closed'
            : schedule.monday}
        </td>
        <td>
          {schedule.tuesday === '11:00am-11:01am' ||
            schedule.tuesday === '11:00pm-11:01pm'
            ? 'Closed'
            : schedule.tuesday}
        </td>
        <td>
          {schedule.wednesday === '11:00am-11:01am' ||
            schedule.wednesday === '11:00pm-11:01pm'
            ? 'Closed'
            : schedule.wednesday}
        </td>
        <td>
          {schedule.thursday === '11:00am-11:01am' ||
            schedule.thursday === '11:00pm-11:01pm'
            ? 'Closed'
            : schedule.thursday}
        </td>
        <td>
          {schedule.friday === '11:00am-11:01am' ||
            schedule.friday === '11:00pm-11:01pm'
            ? 'Closed'
            : schedule.friday}
        </td>
        <td>
          {schedule.saturday === '11:00am-11:01am' ||
            schedule.saturday === '11:00pm-11:01pm'
            ? 'Closed'
            : schedule.saturday}
        </td>
        <td>
          {schedule.sunday === '11:00am-11:01am' ||
            schedule.sunday === '11:00pm-11:01pm'
            ? 'Closed'
            : schedule.sunday}
        </td>
      </tr>);
    });
    return weeks;
  }

  function handleClick (event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose () {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'popover' : undefined;
  if (state.weekNum === -1) {
    return (
      <Image alt='' src="/branda-admin-loading-gif.gif" width={280} height={280} />
    );
  } else {
    return (
      <div>
        <h5>
          Week at a glance - current week is:
          <span style={{ marginLeft: '10px', fontWeight: '500' }}>
            {state.weekStart.toLocaleDateString('en-US')} -{' '}
            {state.weekEnd.toLocaleDateString('en-US')}
          </span>
        </h5>
        <Button
          aria-describedby={id}
          variant="contained"
          style={{ backgroundColor: '#1B4370', color: 'white' }}
          onClick={handleClick}
        >
          Choose Week
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <WeekPicker
            setWeek={setWeek}
            firstDay={state.weekStart}
            lastDay={state.weekEnd}
          />
        </Popover>
        <table style={{ width: '1150px' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mon</th>
              <th>Tues</th>
              <th>Wed</th>
              <th>Thurs</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      </div>
    );
  }
}
