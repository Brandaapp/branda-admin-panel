import { Box, Fab, Grid, Tooltip } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingLogo from '../shared/LoadingLogo';
import ClubCard from './ClubCard';

import AddIcon from '@mui/icons-material/Add';
import AddClubModal from './AddClubModal';

export default function ClubsList ({ isMobile, setSnackMeta }) {
  const [clubs, setClubs] = useState(undefined);

  // cache clubs data so it isn't rerendered when nothing is changed
  const [clubsData, setClubsData] = useState(undefined);

  const [addModalOpen, setAddModalOpen] = useState(false);

  const rerenderClubs = (clubs) => {
    setClubsData(clubs.map((club, index) => {
      return (
        <Grid item key={`${index}:${Math.random()}`}>
          <ClubCard
            name={club.name}
            initialActive={club.active}
            maxMessagesAllowed={club.maxMessagesAllowed}
            members={club.members}
            messageNumber={club.messageNumber}
            onMaxMessagesChange={(maxMessages) => onClubMaxMessageChange(club, maxMessages)}
            onActivationToggle={active => onClubActivationToggle(club, active)}
            onDelete={() => onDeleteClub(club, index)}
            isMobile={isMobile}
          />
        </Grid>
      );
    }));
  };

  useEffect(() => {
    axios.get('/api/getinfo/brandeisclubs')
      .then(response => {
        const clubs = response.data.reverse();
        setClubs(clubs);
      });
  }, []);

  useEffect(() => {
    if (clubs) {
      rerenderClubs(clubs);
    }
  }, [clubs]);

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

  const addNewClub = (name, maxMessagesAllowed, active) => {
    const payload = {
      name,
      maxMessagesAllowed,
      active
    };

    axios.post('/api/getinfo/brandeisclubs', payload)
      .then((response) => {
        const club = response.data;
        setSnackMeta({
          open: true,
          severity: 'success',
          message: `Successfully added ${name}`
        });
        setAddModalOpen(false);
        const tempClubs = JSON.clone(clubs);
        tempClubs.unshift(club);
        setClubs(tempClubs);
      }).catch(() => {
        setSnackMeta({
          open: true,
          severity: 'success',
          message: `Error adding ${name}`
        });
      });
  };

  if (clubs) {
    return (
      <Box p={5}>
        <Grid container direction='row' spacing={5} justifyContent='center'>
          {clubsData}
        </Grid>
        <Tooltip title='Add Club'>
          <Fab
            onClick={() => setAddModalOpen(true)}
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
        <AddClubModal
          open={addModalOpen}
          setOpen={setAddModalOpen}
          isMobile={isMobile}
          onSubmit={addNewClub}
        />
      </Box>
    );
  } else {
    return (
      <LoadingLogo />
    );
  }
}
