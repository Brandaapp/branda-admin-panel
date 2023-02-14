import { Box, TextField, Tooltip } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';

export default function CustomDatePicker ({ date, setDate }) {
  return (
    <Box py={3}>
      <DesktopDatePicker
        inputFormat="MM/DD/YYYY"
        value={date}
        onChange={setDate}
        renderInput={(params) => <Tooltip title='Select a date'>
          <TextField {...params} sx={{ width: '200px' }}/>
        </Tooltip>}
      />
    </Box>
  );
}
