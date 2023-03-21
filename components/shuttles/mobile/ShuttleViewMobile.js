import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';
import CustomDatePicker from '../desktop/CustomDatePicker';

export default function ShuttleViewMobile () {
  const [date, setDate] = useState(dayjs());

  return (
    <Stack spacing={3} justifyContent='center' alignItems='center' p={3}>
      <Typography variant='subtitle1' fontWeight={1} fontSize={16}>
          Welcome to the Branda Shuttle Management page! To select a day to add a shuttle on, please use the
          day picker below To add a shuttle on that day, click the image on the respective card, and
          fill out the fields prompted. To edit or delete a shuttle, click on the shuttle item in the list, and take
          the appropriate action.
          Please email <Link href='mailto: brandaapp@gmail.com'>brandaapp@gmail.com</Link> with any questions.
      </Typography>
      <CustomDatePicker date={date} setDate={setDate} mobile/>
    </Stack>
  );
}
