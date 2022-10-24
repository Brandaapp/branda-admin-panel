import { Grid, Typography } from '@mui/material';
import { weekEnd, weekStart } from '../../../utils/dateUtils.mjs';
import WeekPicker from './WeekPicker.js';

export default function WeekPickerHeader ({ day, fetchWeekSchedule }) {
  return (
    <Grid container directon='row' alignItems={'center'} justifyContent='space-between'>
      <Grid item xs={6}>
        <Typography
          fontSize={30}
          fontWeight={100}
        >
          <b>Current Week: {' '}</b>
          {weekStart(day).format('L')} {' - '}
          {weekEnd(day).format('L')}
        </Typography>
      </Grid>
      <Grid item xs={6} display='flex' flexDirection='row' justifyContent='flex-end' >
        <WeekPicker
          day={day}
          updateData={fetchWeekSchedule}
        />
      </Grid>
    </Grid>
  );
}
