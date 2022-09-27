import React, { useState, useEffect } from 'react';
import { weekStart, weekEnd, weekNum } from '../utils/dateUtils';
import WeekPicker from './WeekPicker';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import WeekEditor from './WeekEditor';
import Modal from '@material-ui/core/Modal';
import AddPlaceForm from './addplace/AddPlaceForm';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Image from 'next/image';

import axios from 'axios';
import createTable from '../utils/renderUtils/tableGenerator';

import { makeStyles } from '@material-ui/core/styles';

let M;
if (typeof window !== 'undefined') {
  M = require('materialize-css');
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

export default function ScheduleEditor (props) {
  const classes = useStyles();
  const [state, setState] = useState({
    weekStart: null,
    weekEnd: null,
    weekNum: -1,
    scheduleData: [],
    updateNum: 0,
    weeks: undefined
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const labels = [
    { key: 'name', label: 'Name' },
    { key: 'mon', label: 'Mon' },
    { key: 'tues', label: 'Tues' },
    { key: 'wed', label: 'Wed' },
    { key: 'thurs', label: 'Thurs' },
    { key: 'fri', label: 'Fri' },
    { key: 'sat', label: 'Sat' },
    { key: 'sun', label: 'Sun' },
    { key: 'adops', label: 'Admin Option' }
  ];

  function setWeek (start, end, num) {
    props.setDataFetched(false);
    axios
      .get(`/api/schedules/${num}`)
      .then((response) => {
        setState({
          weekStart: start,
          weekEnd: end,
          weekNum: num,
          scheduleData: response.data,
          updateNum: state.updateNum + 1,
          weeks: undefined
        });
        props.setDataFetched(true);
      });
  }

  async function resetWeekSchedule () {
    await axios.get(`/api/schedules/${state.weekNum}`).then((response) => {
      setState((prev) => ({ ...prev, scheduleData: response.data }));
    });
  }

  useEffect(() => {
    if (state.weekNum === -1) {
      const day = new Date();
      setWeek(weekStart(day), weekEnd(day), weekNum(day));
    }
  }, [state.weekNum]); // will only update when weekNum is changed (and defaulted to -1)

  /*
  "_" + Math.random().toString(36).substr(2, 9) was previously used for the key
  but was causing weekeditor components to reset state briefly
  */
  function renderRows () {
    const weeks = [];
    state.scheduleData.forEach((schedule) => {
      weeks.unshift(
        <WeekEditor
          schedule={schedule}
          updateNum={state.updateNum}
          weekNum={state.weekNum}
          refresh={resetWeekSchedule}
          key={schedule.name}
          onDeleteSuccess={(msg) => {
            setWeek(state.weekStart, state.weekEnd, state.weekNum);
            M.toast({
              html: msg,
              displayLength: 2500,
              classes: 'green rounded'
            });
          }}
          onDeleteError={(msg) => {
            M.toast({
              html: msg,
              displayLength: 2500,
              classes: 'red rounded'
            });
          }}
        />
      );
    });

    // weeks are now cached locally to avoid re-rendering on popup opening
    setState((prev) => ({ ...prev, weeks: weeks }));

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
        <Backdrop className={classes.backdrop} open={!props.dataFetched}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <h5 style={{ paddingBottom: '20px' }}>
          Schedule Editor - Current week is:
          <span style={{ marginLeft: '10px', fontWeight: '500' }}>
            {state.weekStart.toLocaleDateString('en-US')}-{' '}
            {state.weekEnd.toLocaleDateString('en-US')}
          </span>
        </h5>
        <div
          style={{
            paddingBottom: '20px',
            display: 'flex',
            width: '25%',
            justifyContent: 'space-between'
          }}
        >
          <Button
            aria-describedby={id}
            variant="contained"
            style={{ backgroundColor: '#1B4370', color: 'white', width: '40%' }}
            onClick={handleClick}
          >
            Choose Week
          </Button>
          <Button
            aria-describedby={id}
            variant="contained"
            style={{ backgroundColor: '#1B4370', color: 'white', width: '40%' }}
            onClick={() => setModalOpen(true)}
          >
            Add New Place
          </Button>
        </div>
        <Popover
          id={id}
          open={open ? props.dataFetched : false}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorReference="anchorEl"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          disableScrollLock
          style={{ position: 'absolute', zIndex: 1029 }}

        >
          <WeekPicker
            setWeek={setWeek}
            firstDay={state.weekStart}
            lastDay={state.weekEnd}
          />
        </Popover>
        <Modal
          open={modalOpen}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClose={() => {
            setModalOpen(false);
          }}
          disableScrollLock
        >
          <div>
            <AddPlaceForm
              onSubmit={(msg) => {
                setWeek(state.weekStart, state.weekEnd, state.weekNum);
                setModalOpen(false);
                M.toast({
                  html: msg,
                  displayLength: 2500,
                  classes: 'green rounded'
                });
              }}
              onError={(msg) => {
                M.toast({
                  html: msg,
                  displayLength: 3000,
                  classes: 'red rounded'
                });
                setModalOpen(false);
              }}
            />
          </div>
        </Modal>
        {createTable({ width: '1400px' }, labels, state.weeks || renderRows())}
      </div>
    );
  }
}
