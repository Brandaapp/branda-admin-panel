import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import SpecialEventDisplay from './SpecialEventDisplay';
import SpecialEventForm from './SpecialEventForm';
import { Box, Grid } from '@mui/material';

const SpecialEventView = () => {
  const [state, setState] = useState({
    specialEvents: [],
    dataFetched: false
  });

  const getSpecialEvents = () => {
    axios({
      method: 'get',
      url: '/api/getinfo/specialEvents'
    })
      .then(response => {
        setState({
          specialEvents: response.data.events,
          dataFetched: true
        });
      });
  };

  const createSpecialEvent = (data) => {
    axios({
      method: 'post',
      url: '/api/getinfo/specialEvents',
      data: data
    })
      .then(() => { getSpecialEvents(); });
  };

  useEffect(() => {
    if (!state.dataFetched) {
      getSpecialEvents();
    }
  });

  if (state.dataFetched) {
    return (
      <Box py={4} px={4} spacing={12}>
        <Grid container direction='row'>
          <Grid item xs={6}>
            <SpecialEventForm create={createSpecialEvent} />
          </Grid>
          <Grid item xs={6}>
            <SpecialEventDisplay
              eventList={state.specialEvents}
              refresh={getSpecialEvents}
            />
          </Grid>
        </Grid>
      </Box>
    );
  } else return (<Image alt="" src="/branda-admin-loading-gif.gif" width='280px' height='300px' />);
};

export default SpecialEventView;
