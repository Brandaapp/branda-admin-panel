import { Box, Typography, Grid, Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CustomDatePicker from './CustomDatePicker';
import ShuttleList from './ShuttleList';

const ROUTES = [
  'Campus',
  'Waltham',
  'Boston'
];

const cache = {};

export default function ShuttleViewDesktop ({ setSnackMeta }) {
  const [date, setDate] = useState(dayjs());

  // Routes list
  const [separateRoutes, setSeparateRoutes] = useState({
    campus: [],
    waltham: [],
    boston: []
  });

  useEffect(() => {
    const maybeShuttles = cache[date];
    if (maybeShuttles) {
      setSeparateRoutes(maybeShuttles);
    } else {
      axios.get(`/api/shuttles/${date.format()}`)
        .then(({ data: { times } }) => {
          const separateRoutes = {
            campus: [],
            waltham: [],
            boston: []
          };

          times.forEach(shuttle => {
            separateRoutes[shuttle.route.toLowerCase()].push(shuttle);
          });

          setSeparateRoutes(separateRoutes);
          cache[date] = separateRoutes;
        });
    }
  }, [date]);

  return (
    <Box sx={{
      p: 5,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <Grid container p={2}>
        <Grid item xs={6}>
          <Typography variant='subtitle1' fontWeight={1} fontSize={16}>
              Welcome to the Branda Shuttle Management page! To select a day to add a shuttle on, please use the
              day picker to the right. To add a shuttle on that day, click the image on the respective card, and
              fill out the fields prompted. To edit or delete a shuttle, click on the shuttle item in the list, and take
              the appropriate action.
              Please email <Link href='mailto: brandaapp@gmail.com'>brandaapp@gmail.com</Link> with any questions.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2} textAlign='center'>
            <CustomDatePicker date={date} setDate={setDate} />
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={3} display='flex' flexDirection='row' justifyContent='space-around'>
        {
          ROUTES.map(route => (
            <Grid item xs={4} key={route}>
              <ShuttleList
                date={date}
                routeName={route}
                shuttles={separateRoutes[route.toLowerCase()]}
                setSnackMeta={setSnackMeta}
                propagateShuttle={(shuttles, currentRoute) => {
                  const temp = JSON.clone(separateRoutes);
                  temp[currentRoute.toLowerCase()] = shuttles.times.filter(shuttle =>
                    shuttle.route.toLowerCase() === currentRoute.toLocaleLowerCase()
                  );
                  cache[date] = temp; // update the cache as well
                  setSeparateRoutes(temp);
                }}
                deleteShuttle={(currentRoute, shuttleID) => {
                  const temp = JSON.clone(separateRoutes);
                  const routeTimes = temp[currentRoute.toLowerCase()];
                  const idx =
                    routeTimes.findIndex(shuttle => shuttle.ID === shuttleID);
                  routeTimes.splice(idx, 1);
                  cache[date] = temp;
                  setSeparateRoutes(temp);
                }}
                updateShuttle={(currentRoute, shuttleID, data) => {
                  const temp = JSON.clone(separateRoutes);
                  const routeTimes = temp[currentRoute.toLowerCase()];
                  const idx = routeTimes.findIndex(bus => bus.ID === shuttleID);
                  const old = routeTimes[idx];
                  routeTimes[idx] = { ...old, ...data };
                  temp[currentRoute.toLowerCase()] = routeTimes;
                  cache[date] = temp;
                  setSeparateRoutes(temp);
                }}
              />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
}
