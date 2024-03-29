import { Fab, Popover, TextField, Tooltip } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { PickersDay, StaticDatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { styled } from '@mui/material/styles';

import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';

dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay'
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: '#1B4370',
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark
    }
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%'
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%'
  })
}));

export default function WeekPicker ({ day, updateData, isMobile }) {
  const [anchorEl, setAnchorEl] = useState(undefined);

  const renderWeekPickerDay = (date, _, pickersDayProps) => {
    const value = dayjs(day);
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = value.startOf('week');
    const end = value.endOf('week');

    const dayIsBetween = date.isBetween(start, end, null, '[]');
    const isFirstDay = date.isSame(start, 'day');
    const isLastDay = date.isSame(end, 'day');

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  return (
    <>
      <Tooltip title='Choose week' placement='right'>
        <Fab
          color='primary'
          aria-label='choose week'
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <CalendarMonthIcon />
        </Fab>
      </Tooltip>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <StaticDatePicker
          displayStaticWrapperAs={isMobile ? 'mobile' : 'desktop'}
          label="Week picker"
          value={dayjs(day)}
          onChange={(newValue) => {
            updateData(newValue);
          }}
          renderDay={renderWeekPickerDay}
          renderInput={(params) => <TextField {...params} />}
          inputFormat="'Week of' MMM d"
        />
      </Popover>
    </>
  );
}
