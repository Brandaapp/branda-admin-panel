import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';

import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import dayjs from 'dayjs';

export default function ShuttleList ({ routeName, openModal, shuttles }) {
  return (
    <Card sx={{ m: 3, minWidth: 200 }}>
      <Tooltip title='Click to add a shuttle' placement='top' arrow>
        <CardActionArea onClick={() => openModal(routeName)}>
          <CardMedia component='img' image={`/locations/${routeName}.png`} sx={{ height: 140 }}/>
        </CardActionArea>
      </Tooltip>
      <CardContent sx={{ py: 3 }}>
        <Typography variant='h5' component='div' fontWeight={1} textAlign='center'>
          {routeName}
        </Typography>
        <List>
          {
            shuttles.map(shuttle => (
              <ListItem
                key={shuttle.ID}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <DirectionsBusIcon />
                  </ListItemIcon>
                  <Stack spacing={1}>
                    <Typography variant='h6'>{shuttle.busName}</Typography>
                    <Typography variant='subtitle2' fontWeight={1}>
                      {dayjs(shuttle.start).format('ddd. h:mm a')} - {dayjs(shuttle.end).format('ddd. h:mm a')}
                    </Typography>
                  </Stack>
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </CardContent>
    </Card>
  );
}
