import { Box, Typography, Grid, Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AddShuttleModal from './AddShuttleModal';
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

  // Modal metadata
  const [currentRoute, setCurrentRoute] = useState('');
  const [addShuttleModalOpen, setAddShuttleModalOpen] = useState(false);

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
              fill out the fields prompted. To edit or delete a shuttle, click on the pencil icon, and take
              the appropriate action.
              Please reach out to <Link href='mailto: brandaapp@gmail.com'>brandaapp@gmail.com</Link>
              with  any questions.
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
                routeName={route}
                shuttles={separateRoutes[route.toLowerCase()]}
                openModal={route => {
                  setCurrentRoute(route);
                  setAddShuttleModalOpen(true);
                }}/>
            </Grid>
          ))
        }
      </Grid>
      <AddShuttleModal
        open={addShuttleModalOpen}
        setOpen={setAddShuttleModalOpen}
        routeName={currentRoute}
        date={date}
        setSnackMeta={setSnackMeta}
        propagateShuttle={shuttles => {
          const temp = JSON.clone(separateRoutes);
          temp[currentRoute.toLowerCase()] = shuttles.times.filter(shuttle =>
            shuttle.route.toLowerCase() === currentRoute.toLocaleLowerCase()
          );
          setSeparateRoutes(temp);
        }}
      />
    </Box>
  );
}
