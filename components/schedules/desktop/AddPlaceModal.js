import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { packageScheduleData } from '../../../utils/dateUtils.mjs';
import WeekEditor, { DAYS } from './WeekEditor';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

// default 9-5 time
const defaultTimeObject = '9:00am-5:00pm';

export default function AddPlaceModal ({ open, setOpen, onCreate, setSnackMeta }) {
  const [schedule, setSchedule] = useState(undefined);
  const [times, setTimes] = useState({});

  const [group, setGroup] = useState('');
  const [name, setName] = useState('');

  const [dataSending, setDataSending] = useState(false);

  useEffect(() => {
    const tempSchedule = {};
    DAYS.forEach(day => {
      tempSchedule[day.toLowerCase()] = defaultTimeObject;
    });
    setSchedule(tempSchedule);
  }, []);

  const postPlace = () => {
    const packagedTimes = packageScheduleData(times);
    const weeks = Array(54)
      .fill()
      .map(() => packagedTimes);

    setDataSending(true);
    let payload;
    axios.post('/api/places/add', { name, group })
      .then(response => {
        const empId = response.data._id;
        payload = {
          name,
          emp_id: empId,
          ...packagedTimes
        };
        axios.post('/api/schedules', { ...payload, weeks, group })
          .then(() => {
            setSnackMeta({
              open: true,
              message: `Successfully created a new place: "${name}"`,
              severity: 'success'
            });
          })
          .catch(() => {
            setSnackMeta({
              open: true,
              message: `Error creating new place`,
              severity: 'error'
            });
          });
      })
      .catch(() => {
        // place exists already
        setSnackMeta({
          open: true,
          message: `"${name}" already exits! If it does not appear in the dropdown list, 
            and you would like to re-activate it, please contact a Branda administrator.`,
          severity: 'error'
        });
      })
      .finally(() => {
        setDataSending(false);
        setName('');
        setGroup('');
        setOpen(false);
        onCreate(payload);
      });
  };

  const validInput = () => name && group;

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Grid container direction={'column'} spacing={5}>
          <Grid item xs={1}>
            <Typography
              fontSize={40}
              textAlign='center'
            >
              Add a New Place
            </Typography>
          </Grid>
          <Grid item xs={1} display='flex' justifyContent={'center'}>
            <FormControl fullWidth sx={{
              minWidth: '10%',
              width: '60%'
            }}>
              <TextField
                id="outlined-basic"
                label="Place Name"
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={1} display='flex' justifyContent={'center'}>
            <FormControl fullWidth
              sx={{
                minWidth: '10%',
                width: '60%',
                textAlign: 'start'
              }}>
              <InputLabel id="place-select-label">Place</InputLabel>
              <Select
                labelId="group-select-label"
                id="group-select"
                value={group}
                label='Place'
                onChange={(e) => setGroup(e.target.value)}
              >
                <MenuItem value={'Dining'}>Dining</MenuItem>
                <MenuItem value={'Sport'}>Sport</MenuItem>
                <MenuItem value={'Library'}>Library</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <WeekEditor schedule={schedule} times={times} setTimes={setTimes} editMode={true}/>
          </Grid>
          <Grid item sx={{ display: 'flex', flexDirection: 'row-reverse' }} xs={1}>
            <Tooltip title={
              !validInput()
                ? 'Please fill out necessary fields'
                : 'Add new place'
            }
            placement='left'
            >
              <div>
                <Button
                  variant='contained'
                  sx={{ backgroundColor: '#1B4370' }}
                  onClick={postPlace}
                  disabled={dataSending || !validInput()}
                >
                  {dataSending ? 'Adding place...' : 'Add Place'}
                </Button>
              </div>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
