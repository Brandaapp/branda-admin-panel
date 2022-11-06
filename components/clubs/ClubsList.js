import { Box, Fab, Grid, Tooltip } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingLogo from '../shared/LoadingLogo';
import ClubCard from './ClubCard';

import AddIcon from '@mui/icons-material/Add';

export default function ClubsList ({ isMobile }) {
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
    });
  };

  const onClubActivationToggle = (club, active) => {
    axios.patch('/api/getinfo/brandeisclubs', {
      id: club.id,
      active
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
