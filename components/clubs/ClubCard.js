import { Card, CardActions, CardContent, IconButton, Switch, TextField, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';

export default function ClubCard ({
  name,
  initialActive,
  maxMessagesAllowed,
  messageNumber,
  members,
  onMaxMessagesChange,
  onActivationToggle,
  onDelete,
  isMobile
}) {
  const [active, setActive] = useState(initialActive);
  const [maxMessages, setMaxMessages] = useState(maxMessagesAllowed);

  const [editMode, setEditMode] = useState(false);

  const onEditClose = () => {
    if (maxMessages === '') {
      setMaxMessages(0);
    }

    setEditMode(false);
    onMaxMessagesChange(maxMessages);
  };

  return (
    <Card sx={{
      width: isMobile ? 300 : 310,
      height: 250,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'auto'
    }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Members: {members}
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography fontSize={20}>
              Messages sent: {messageNumber}{'/'}
            </Typography>
            {
              editMode
                ? <TextField
                  value={maxMessages}
                  onChange={event => setMaxMessages(event.target.value)}
                  type='number'
                  variant='standard'
                  sx={{ width: '25%' }}
                  inputProps={{
                    style: { fontSize: 20, height: 20, marginTop: 1 }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      onEditClose();
                    }
                  }}
                  onBlur={onEditClose}
                  autoFocus
                />
                : <span onClick={() => setEditMode(true)}>
                  <Typography fontSize={20}>
                    {maxMessages}
                  </Typography>
                </span>
            }
          </div>
          {
            editMode
              ? <IconButton aria-label={`confirm-max-msgs-${name}`} onClick={onEditClose}>
                <Tooltip title='Confirm max messages'>
                  <CheckIcon fontSize='small'/>
                </Tooltip>
              </IconButton>
              : <IconButton aria-label={`edit-max-msgs-${name}`} onClick={() => setEditMode(true)}>
                <Tooltip title='Edit max messages'>
                  <EditIcon fontSize='small'/>
                </Tooltip>
              </IconButton>
          }
        </div>
      </CardContent>
      <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Tooltip title={active ? 'Toggle to unapproved' : 'Toggle to approved'}>
          <Switch
            aria-label={`toggle-active-${name}`}
            checked={active}
            onChange={(event) => {
              const newActive = event.target.checked;
              setActive(newActive);
              onActivationToggle(newActive);
            }}
          />
        </Tooltip>
        <Tooltip title='Delete club'>
          <IconButton aria-label={`delete-${name}`}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
