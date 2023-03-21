import { Box, TextField, Tooltip } from '@mui/material';
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';

export default function CustomDatePicker ({ date, setDate, mobile }) {
  return (
    <Box py={3} pl={mobile ? 0 : 25}>
      {
        mobile
          ? <MobileDatePicker
            inputFormat="MM/DD/YYYY"
            label='Day Shuttle Starts'
            value={date}
            onChange={setDate}
            renderInput={(params) =>
              <TextField {...params} sx={{ width: '200px' }}/>
            }
          />
          : <DesktopDatePicker
            inputFormat="MM/DD/YYYY"
            label='Day Shuttle Starts'
            value={date}
            onChange={setDate}
            renderInput={(params) => <Tooltip title='Select a date'>
              <TextField {...params} sx={{ width: '200px' }}/>
            </Tooltip>}
          />
      }
    </Box>
  );
}
