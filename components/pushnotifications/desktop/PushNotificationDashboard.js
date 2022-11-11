import { Box, Grid } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import LoadingLogo from '../../shared/LoadingLogo';
import PushNotificationForm from './PushNotificationForm';
import ScheduledPushNotifications from './ScheduledPushNotifications';

export default function PushNotificationDashboard () {
  const [session] = useSession();

  const [userOrgs, setUserOrgs] = useState(undefined);

  useEffect(() => {
    const id = session.user.id;
    axios.get(`/api/users/${id}/clubs`)
      .then(response => {
        const organizations = response.data;
        setUserOrgs(organizations);
      });
  }, []);

  if (userOrgs) {
    return (
      <Box py={3} px={5}>
        <Grid container direction='row' spacing={10}>
          <Grid item xs={5}>
            <PushNotificationForm clubs={userOrgs}/>
          </Grid>
          <Grid item xs={6}>
            <ScheduledPushNotifications />
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return (
      <LoadingLogo />
    );
  }
}
