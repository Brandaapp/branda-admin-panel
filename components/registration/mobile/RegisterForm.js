import {
  Box,
  Button,
  FormControl,
  Grid,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import LoadingLogo from '../../shared/LoadingLogo';
import { useState } from 'react';
import axios from 'axios';
import consts from '../consts.json';
import {
  validEmail,
  validUserState,
  passwordsMatch
} from '../utils';
import UserRoleContent from '../shared/UserTypeSelect';

const { defaultUserImageURI } = consts;

export default function RegisterForm ({ setSnackMeta }) {
  // Metadata
  const [approvedClubs, setApprovedClubs] = useState(undefined);

  // User information
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [userType, setUserType] = useState('');
  const [orgAccess, setOrgAccess] = useState([]);

  const handleFieldChange = (set, event) => {
    set(event.target.value);
  };

  const clearFields = () => {
    [setUsername, setPassword, setPasswordConfirmation, setEmail, setUserType]
      .forEach(func => func(''));
    setOrgAccess([]);
  };

  const register = () => {
    if (passwordsMatch(password, passwordConfirmation) && validEmail(email)) {
      const payload = {
        username,
        password,
        email,
        userType,
        picture: defaultUserImageURI,
        organizations: orgAccess
      };
      axios.post('/api/users', payload)
        .then(() => {
          setSnackMeta({
            open: true,
            severity: 'success',
            message: 'User successfully registered!'
          });

          clearFields();
        })
        .catch(() => {
          setSnackMeta({
            open: true,
            severity: 'error',
            message: 'Was not able to register user.'
          });
        });
    }
  };

  useState(() => {
    axios.get('/api/getinfo/brandeisclubs/approved')
      .then(({ data: { approvedOrganizations } }) => {
        setApprovedClubs(approvedOrganizations);
      });
  }, []);

  const notValidEmail = !validEmail(email);
  const passwordsDontMatch = !passwordsMatch(password, passwordConfirmation);
  const notValidUser = !validUserState(username, email, password, userType, passwordConfirmation);

  if (approvedClubs) {
    return (
      <Box p={5} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
        <Paper elevation={15} sx={{
          py: 5,
          width: '90vw',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Stack spacing={5} width='85%'>
            <Typography textAlign='center' fontSize={25}>
                Register a New User
            </Typography>
            <Grid container direction='row' justifyContent='space-evenly'>
              <Grid item width='100%'>
                <FormControl fullWidth>
                  <Stack spacing={3}>
                    <TextField
                      variant='outlined'
                      label='Username'
                      value={username}
                      onChange={handleFieldChange.bind(null, setUsername)}
                      required
                    />
                    <TextField
                      variant='outlined'
                      label='Email'
                      value={email}
                      onChange={handleFieldChange.bind(null, setEmail)}
                      error={notValidEmail}
                      helperText={notValidEmail ? 'Please enter a valid email' : ''}
                      required
                    />
                    <TextField
                      variant='outlined'
                      label='Password'
                      type='password'
                      value={password}
                      onChange={handleFieldChange.bind(null, setPassword)}
                      required
                    />
                    <TextField
                      variant='outlined'
                      label='Confirm Password'
                      type='password'
                      value={passwordConfirmation}
                      onChange={handleFieldChange.bind(null, setPasswordConfirmation)}
                      error={passwordsDontMatch}
                      helperText={passwordsDontMatch ? 'Passwords must match' : ''}
                    />
                    <UserRoleContent
                      approvedClubs={approvedClubs}
                      orgAccess={orgAccess}
                      setOrgAccess={setOrgAccess}
                      setUserType={setUserType}
                      userType={userType}
                    />
                  </Stack>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container direction='row' alignItems='center' justifyContent='center'>
              <Tooltip
                title={
                  notValidUser
                    ? 'Please fill out all of the required fields'
                    : 'Register user'
                }
              >
                <div>
                  <Button
                    variant='contained'
                    onClick={register}
                    disabled={notValidUser}
                  >
                    Register User
                  </Button>
                </div>
              </Tooltip>
            </Grid>
          </Stack>
        </Paper>
      </Box>
    );
  } else {
    return (
      <LoadingLogo />
    );
  }
}
