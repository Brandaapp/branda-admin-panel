import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import LoadingLogo from '../../shared/LoadingLogo';
import { useState } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import consts from '../consts.json';
import {
  validEmail,
  validUserState,
  passwordsMatch
} from '../utils';
import UserRoleContent from '../shared/UserTypeSelect';

const { defaultUserImageURI } = consts;

export default function RegisterForm () {
  // Metadata
  const [approvedClubs, setApprovedClubs] = useState(undefined);
  const [snackMeta, setSnackMeta] = useState({ open: false, message: undefined, severity: 'success' });

  const closeSnack = () => {
    const snack = JSON.clone(snackMeta);
    snack.open = false;
    setSnackMeta(snack);
  };

  const snackAction = (
    <div>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </div>
  );

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
        <Paper elevation={15} sx={{ p: 5, width: '90vw' }}>
          <Stack spacing={5} width='100%'>
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
        <Snackbar
          open={snackMeta.open}
          autoHideDuration={3500}
          onClose={closeSnack}
          action={snackAction}
          key='topright'
          sx={{ maxWidth: 600 }}
        >
          <Alert onClose={closeSnack} severity={snackMeta.severity} sx={{ width: '100%' }}>
            {snackMeta.message}
          </Alert>
        </Snackbar>
      </Box>
    );
  } else {
    return (
      <LoadingLogo />
    );
  }
}
