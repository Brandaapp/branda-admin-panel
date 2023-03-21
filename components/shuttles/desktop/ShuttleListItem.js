import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';

import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import dayjs from 'dayjs';
import { useState } from 'react';
import EditShuttleModal from './EditShuttleModal';

export default function ShuttleListItem ({ shuttle, setSnackMeta, deleteShuttle, updateShuttle, date }) {
  const [edit, setEdit] = useState(false);

  return (
    <ListItem
      alignItems='flex-start'
    >
      <ListItemButton onClick={() => setEdit(true)}>
        <ListItemAvatar>
          <Avatar>
            <DirectionsBusIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant='h6' fontSize={17}>{shuttle.busName}</Typography>}
          secondary={`${dayjs(shuttle.start).format('ddd. h:mm a')} - ${dayjs(shuttle.end).format('ddd. h:mm a')}`}
        />
      </ListItemButton>
      <EditShuttleModal
        open={edit}
        date={date}
        routeName={shuttle.route}
        setOpen={setEdit}
        initialShuttle={{ text: shuttle.busName, value: shuttle.busID, ID: shuttle.ID }}
        initialStart={shuttle.start}
        initialEnd={shuttle.end}
        setSnackMeta={setSnackMeta}
        propagateRemove={() => deleteShuttle(shuttle.route, shuttle.ID)}
        propagateUpdate={(data) => {
          updateShuttle(shuttle.route, shuttle.ID, data);
        }}
      />
    </ListItem>
  );
}
