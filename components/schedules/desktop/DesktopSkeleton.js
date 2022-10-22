import { Box, Grid, Typography, Skeleton, Stack, Button } from '@mui/material';
import { weekEnd, weekStart } from '../../../utils/dateUtils.mjs';
import { DAYS } from './WeekEditor';

export default function DesktopSkeleton ({ day }) {
  return (
    <Box pt={12} px={5} display='flex' flexDirection={'column'}>
      <Grid container spacing={2} direction='column'>
        <Grid container display='flex' justifyContent={'space-around'} alignItems={'center'} pl={3}>
          <Grid item xs={2}>
            <Skeleton variant='rectangular' height={40} width={'60%'}/>
          </Grid>
          <Grid item xs={6}>
            <Typography
              fontSize={30}
              fontWeight={100}
            >
              <b>Current Week: {' '}</b>
              {weekStart(day).format('L')} {' - '}
              {weekEnd(day).format('L')}

            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Skeleton variant='rectangular' height={55}/>
          </Grid>
        </Grid>
        <Grid item sx={{ mt: 5 }}>
          <Grid container pl={5} mb={5} spacing={5} direction='row' flexWrap={'wrap'}>
            {
              DAYS.map((day) => {
                return (
                  <Grid key={day} item xs={12 / 7}>
                    <Stack spacing={3}>
                      <Typography fontWeight={1000} textAlign='center'>
                        {day}
                      </Typography>
                      <Skeleton variant='rectangular' height={55}/>
                      <Skeleton variant='rectangular' height={55}/>
                    </Stack>
                  </Grid>
                );
              })
            }
          </Grid>
        </Grid>
        <Grid item xs={2} display='flex' justifyContent={'space-around'} pt={5} flexWrap='wrap'>
          <Grid item>
            <Button variant='contained' sx={{ backgroundColor: '#1B4370' }}>
              Update Week
            </Button>
          </Grid>
          <Grid item>
            <Button variant='contained' sx={{ backgroundColor: '#1B4370' }}>
              Clear Edits
            </Button>
          </Grid>
          <Grid item>
            <Button variant='contained' sx={{ backgroundColor: '#1B4370' }}>
              Delete Place
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
