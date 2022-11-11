import { Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function ScheduledPushNotifications () {
  return (
    <Stack alignItems='center' spacing={2}>
      <Typography variant='h3' textAlign='center'>
        Scheduled Push Notifications
      </Typography>
      <Typography variant='subtitle2' textAlign='center' fontWeight={2}>
        All of your scheduled push notifications will appear below. <b>Please note</b>{' '}
        that any scheduled push notification will be sent within a <i>15 minute</i> window. This is based on{' '}
        the system we use to schedule push notifications. If you have any questions or concerns, please{' '}
        reach out to <Link href='mailto: brandaapp@gmail.com'>brandaapp@gmail.com</Link>
      </Typography>
    </Stack>
  );
}
