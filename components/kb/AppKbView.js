import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import AppKbDisplay from './AppKbDisplay';
import AppKbForm from './AppKbForm';
import { Box, Grid } from '@mui/material';

const AppKBView = () => {
  const [state, setState] = useState({
    appKB: [],
    dataFetched: false
  });

  const getAppKB = () => {
    axios({
      method: 'get',
      url: '/api/getinfo/kb/getAppKb'
    })
      .then(response => {
        setState({
          appKB: response.data.kb,
          dataFetched: true
        });
      });
  };

  const createAppKB = (data) => {
    axios({
      method: 'post',
      url: '/api/getinfo/kb/getAppKb',
      data: data
    })
      .then(() => { getAppKB(); });
  };

  useEffect(() => {
    if (!state.dataFetched) {
      getAppKB();
    }
  });

  if (state.dataFetched) {
    return (
      <Box py={4} px={4} spacing={12}>
        <Grid container direction='row'>
          <Grid item xs={6}>
            <AppKbForm create={createAppKB} />
          </Grid>
          <Grid item xs={6}>
            <AppKbDisplay
              appKbs={state.appKB}
              refresh={getAppKB}
            />
          </Grid>
        </Grid>
      </Box>
    );
  } else return (<Image alt="" src="/branda-admin-loading-gif.gif" width='280px' height='300px' />);
};

export default AppKBView;
