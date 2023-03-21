import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  List,
  Tooltip,
  Typography
} from '@mui/material';

import AddShuttleModal from './AddShuttleModal';
import { useEffect, useState } from 'react';
import ShuttleListItem from './ShuttleListItem';

export default function ShuttleList ({
  date,
  routeName,
  shuttles,
  setSnackMeta,
  propagateShuttle,
  deleteShuttle,
  updateShuttle
}) {
  // Modal metadata
  const [currentRoute, setCurrentRoute] = useState('');
  const [addShuttleModalOpen, setAddShuttleModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  // Shuttle list items
  const [shuttleList, setShuttleList] = useState([]);

  useEffect(() => {
    if (shuttles) {
      const temp = shuttles.map(shuttle => (
        <ShuttleListItem
          shuttle={shuttle}
          key={shuttle.ID}
          setSnackMeta={setSnackMeta}
          deleteShuttle={deleteShuttle}
          updateShuttle={updateShuttle}
        />
      ));
      setShuttleList(temp);
    }
  }, [shuttles]);

  const openModal = (route) => {
    setCurrentRoute(route);
    setEditing(false);
    setAddShuttleModalOpen(true);
  };

  return (
    <Card sx={{ m: 3, minWidth: 200 }}>
      <Tooltip title='Click to add a shuttle' placement='top' arrow>
        <CardActionArea onClick={() => openModal(routeName, false)}>
          <CardMedia component='img' image={`/locations/${routeName}.png`} sx={{ height: 140 }}/>
        </CardActionArea>
      </Tooltip>
      <CardContent sx={{ py: 3 }}>
        <Typography variant='h5' component='div' fontWeight={1} textAlign='center'>
          {routeName}
        </Typography>
        {
          shuttleList.length
            ? <List sx={{ overflow: 'auto', maxHeight: 250 }}>
              {
                shuttles.map(shuttle => (
                  <ShuttleListItem
                    shuttle={shuttle}
                    key={shuttle.ID}
                    setSnackMeta={setSnackMeta}
                    deleteShuttle={deleteShuttle}
                    updateShuttle={updateShuttle}
                    date={date}
                  />
                ))
              }
            </List>
            : <Typography variant='subtitle1' fontWeight={1} textAlign='center'>
              No {routeName} shuttles added on {date.format('MMMM D, YYYY')}. Click the image to add a shuttle.
            </Typography>
        }
      </CardContent>
      <AddShuttleModal
        open={addShuttleModalOpen}
        setOpen={setAddShuttleModalOpen}
        routeName={currentRoute}
        date={date}
        setSnackMeta={setSnackMeta}
        propagateShuttle={propagateShuttle}
        edit={editing}
      />
    </Card>
  );
}
