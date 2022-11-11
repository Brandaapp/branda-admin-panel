import { Modal, Typography, TextField, Checkbox, Stack, Button, FormControl, Tooltip, Card } from '@mui/material';
import { useState } from 'react';

export default function AddClubModal ({ open, setOpen, isMobile, onSubmit }) {
  const [name, setName] = useState('');
  const [maxMessages, setMaxMessages] = useState(5);
  const [approved, setApproved] = useState(true);

  const clearForm = () => {
    setName('');
    setMaxMessages(5);
    setApproved(true);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        clearForm();
      }}
      aria-labelledby='Add a new club'
      aria-describedby='Fill out fields to add a new club'
    >
      <Card sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        boxShadow: 24,
        px: 4,
        py: 5,
        width: isMobile ? '70%' : '20%',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <FormControl fullWidth>
          <Stack spacing={3} alignItems='center'>
            <Typography fontSize={30}>
              Add a New Club
            </Typography>
            <TextField label='Club Name' value={name} onChange={event => setName(event.target.value)} required/>
            <TextField
              label='Max Messages'
              type='number'
              value={maxMessages}
              onChange={event => setMaxMessages(event.target.value)}
            />
            <Stack direction='row' spacing={2} alignItems='center'>
              <Typography>Approved: </Typography>
              <Checkbox checked={approved} onChange={event => setApproved(event.target.checked)}/>
            </Stack>
            <Tooltip
              title={
                name === ''
                  ? 'Please enter a club name'
                  : 'Add club'
              }
            >
              <div>
                <Button
                  variant='contained'
                  onClick={() => {
                    onSubmit(name, maxMessages, approved);
                    clearForm();
                  }}
                  disabled={name === ''}
                >
                  <Typography>
                Add Club
                  </Typography>
                </Button>
              </div>
            </Tooltip>
          </Stack>
        </FormControl>
      </Card>
    </Modal>
  );
}
