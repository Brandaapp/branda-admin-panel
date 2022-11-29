import { Grid, Stack, Typography, Box } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LoadingLogo from '../../shared/LoadingLogo';
import ScheduledPushNotificationCard from './ScheduledPushNotificationCard';

export default function ScheduledPushNotifications ({ author, emitter, setSnackMeta }) {
  const [notifs, setNotifs] = useState(undefined);

  useEffect(() => {
    axios.get(`/api/pushnotifications/schedule?author=${author}`)
      .then(response => {
        setNotifs(response.data.reverse());
      });

    emitter.on('scheduled', payload => {
      setNotifs(notifs => {
        notifs.unshift(payload);
        return notifs;
      });
    });
  }, []);

  const onSendNotification = id => {
    axios.post(`/api/pushnotifications/schedule/${id}/send`)
      .then(() => {
        setSnackMeta({
          open: true,
          severity: 'success',
          message: 'Successfully sent and deleted scheduled push notification'
        });
        removeNotification(id);
      }).catch(() => {
        setSnackMeta({
          open: true,
          severity: 'error',
          message: 'Error sending scheduled push notification'
        });
      });
  };

  const onDeleteNotification = id => {
    axios.delete(`/api/pushnotifications/schedule/${id}`)
      .then(() => {
        setSnackMeta({
          open: true,
          severity: 'success',
          message: 'Successfully deleted scheduled push notification'
        });
        removeNotification(id);
      })
      .catch(() => {
        setSnackMeta({
          open: 'true',
          severity: 'error',
          message: 'Error deleting scheduled push notification'
        });
      });
  };

  const removeNotification = id => {
    setNotifs(notifs => notifs.filter(notif => notif._id !== id));
  };

  return (
    <Stack justifyContent='center' spacing={2}>
      <Typography variant='h3' textAlign='center'>
        Scheduled Push Notifications
      </Typography>
      <Typography variant='subtitle2' textAlign='center' fontWeight={2}>
        All of your scheduled push notifications will appear below. <b>Please note</b>{' '}
        that any scheduled push notification will be sent within a <i>15 minute</i> window. This is based on{' '}
        the system we use to schedule push notifications. If you have any questions or concerns, please{' '}
        reach out to <Link href='mailto: brandaapp@gmail.com'>brandaapp@gmail.com</Link>
      </Typography>
      {
        notifs
          ? <Grid container direction='row' spacing={5} justifyContent='flex-start'>
            {
              notifs.map((notif, index) => {
                return <Grid item key={`${index}:${Math.random()}`}>
                  <ScheduledPushNotificationCard
                    notification={notif}
                    onDelete={onDeleteNotification.bind(this, notif._id)}
                    onSend={onSendNotification.bind(this, notif._id)}
                  />
                </Grid>;
              })
            }
          </Grid>
          : <Box
            width='100%'
            height='500px'
            display='flex'
            flexDirection='row'
            justifyContent='center'
            alignItems='center'
          >
            <LoadingLogo />
          </Box>
      }
    </Stack>
  );
}
