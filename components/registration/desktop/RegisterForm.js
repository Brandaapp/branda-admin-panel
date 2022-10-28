import { Box, FormControl, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import LoadingLogo from '../../shared/LoadingLogo';
import { useState } from 'react';
import axios from 'axios';

// const userTypes = [
//   'Employee',
//   'Manager',
//   'Public Safety',
//   'Josephs',
//   'Organization Admin'
// ];

const defaultUserImageURI =
  'https://raw.githubusercontent.com/clsavino/react-shift-scheduler/master/public/assets/images/logo.png';

export default function RegisterForm ({ isMobile }) {
  // Metadata
  const [approvedClubs, setApprovedClubs] = useState(undefined);

  // User information
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const validEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^\S+@\S+\.\S+$/
      );
  };

  useState(() => {
    axios.get('/api/getinfo/brandeisclubs/approved')
      .then(({ data: { approvedOrganizations } }) => {
        setApprovedClubs(approvedOrganizations);
      });
  }, []);

  if (approvedClubs) {
    return (
      <Box p={5} height='85vh'>
        <Paper elevation={10} sx={{ height: '100%', p: 5 }}>
          <Grid container direction='row' justifyContent='space-between'>
            <Grid item xs={5} display='flex' flexDirection='column' alignItems='center'>
              <Typography
                fontSize={30}
              >
                Basic Information
              </Typography>
              <Grid
                item
                display='flex'
                flexDirection='row'
                height='65vh'
                width={'100%'}
                flex={1}
                justifyContent='space-around'
              >
                <Grid item pt={5} flex={4} overflow='scroll' maxHeight={'60vh'}>
                  <FormControl sx={{ width: '100%' }}>
                    <Stack spacing={5}>
                      <TextField
                        id='username'
                        label="Username"
                        variant="outlined"
                        type='text'
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                      />
                      <TextField
                        id='email'
                        label="Email"
                        variant="outlined"
                        type='email'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        helperText={email === '' || validEmail(email) ? '' : 'Please enter a valid email'}
                        error={email === '' ? false : !validEmail(email)}
                      />
                      <TextField
                        id='password'
                        label="Password"
                        variant="outlined"
                        type='password'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                      />
                      <TextField
                        id='confirm-password'
                        label="Confirm Password"
                        variant="outlined"
                        type='password'
                        value={passwordConfirmation}
                        onChange={event => setPasswordConfirmation(event.target.value)}
                        error={passwordConfirmation !== password}
                        helperText={passwordConfirmation !== password ? 'Passwords must match' : ''}
                      />
                    </Stack>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  } else {
    return (
      <LoadingLogo />
    );
  }
}
