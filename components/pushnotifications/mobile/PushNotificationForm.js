import { Box } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import LoadingLogo from '../../shared/LoadingLogo';
import { default as PushNotifForm } from '../desktop/PushNotificationForm';

export default function PushNotificationForm ({ setSnackMeta }) {
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
      <Box py={5} px={2}>
        <PushNotifForm mobile clubs={userOrgs} setSnackMeta={setSnackMeta}/>
      </Box>
    );
  } else {
    return (
      <LoadingLogo />
    );
  }
}
