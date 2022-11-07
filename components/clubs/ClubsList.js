import { Box, Fab, Grid, Tooltip } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingLogo from '../shared/LoadingLogo';
import ClubCard from './ClubCard';

import AddIcon from '@mui/icons-material/Add';

export default function ClubsList ({ isMobile, setSnackMeta }) {
  const [clubs, setClubs] = useState(undefined);

  useEffect(() => {
    axios.get('/api/getinfo/brandeisclubs')
      .then(response => {
        setClubs(response.data);
      });
  }, []);

  const onClubMaxMessageChange = (club, max) => {
    axios.patch('/api/getinfo/brandeisclubs', {
      id: club.id,
      maxMessagesAllowed: max
    }).then(() => {
      setSnackMeta({
        open: true,
        severity: 'success',
        message: `Changed max messages for ${club.name}`
      });
    }).catch(() => {
      setSnackMeta({
        open: true,
        severity: 'error',
        message: `Error changing max messages for ${club.name}`
      });
    });
  };

  const onClubActivationToggle = (club, active) => {
    axios.patch('/api/getinfo/brandeisclubs', {
      id: club.id,
      active
    }).then(() => {
      setSnackMeta({
        open: true,
        severity: 'success',
        message: `Toggled ${club.name} to ${active ? 'active' : 'inactive'}`
      });
    }).catch(() => {
      setSnackMeta({
        open: true,
        severity: 'error',
        message: `Error toggling active state of ${club.name}`
      });
    });
  };

  const onDeleteClub = (club, index) => {
    axios.delete('/api/getinfo/brandeisclubs', { data: { id: club.id } })
      .then(() => {
        setSnackMeta({
          open: true,
          severity: 'success',
          message: `Successfully deleted ${club.name}`
        });
        // remove club from array
        const tempClubs = JSON.clone(clubs);
        tempClubs.splice(index, 1);
        setClubs(tempClubs);
      }).catch(() => {
        setSnackMeta({
          open: true,
          severity: 'error',
          message: `Error deleting ${club.name}`
        });
      });
  };

  if (clubs) {
    return (
      <Box p={5}>
        <Grid container direction={isMobile ? 'column' : 'row'} spacing={5} justifyContent='center'>
          {clubs.map((club, index) => {
            return (
              <Grid item key={index}>
                <ClubCard
                  name={club.name}
                  initialActive={club.active}
                  maxMessagesAllowed={club.maxMessagesAllowed}
                  members={club.members}
                  messageNumber={club.messageNumber}
                  onMaxMessagesChange={onClubMaxMessageChange.bind(this, club)}
                  onActivationToggle={onClubActivationToggle.bind(this, club)}
                  onDelete={onDeleteClub.bind(this, club, index)}
                  isMobile={isMobile}
                />
              </Grid>
            );
          })}
        </Grid>
        <Tooltip title='Add Club'>
          <Fab
            color='primary'
            sx={{
              margin: 0,
              top: 'auto',
              right: 30,
              bottom: 30,
              left: 'auto',
              position: 'fixed'
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
    );
  } else {
    return (
      <LoadingLogo />
    );
  }
}
