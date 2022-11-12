import {
  Alert,
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/client';
import { access } from '../../utils/rolesUtils.mjs';
import Link from 'next/link.js';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPW, setShowPW] = useState(false);

  const router = useRouter();

  const [error, setError] = useState(false);

  const postSignInInfo = async () => {
    signIn('credentials', { redirect: false, username, password })
      .then(res => {
        if (!res.ok) {
          setError(true);
          setUsername('');
          setPassword('');
        } else {
          return getSession();
        }
      }).then(async (session) => {
        if (session) {
          await router.push(access[session.user.type].redirectTo);
        }
      });
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') postSignInInfo();
  };

  return (
    <Container maxWidth='xs'>
      {error
        ? <Alert
          variant='standard'
          severity="error"
          sx={{
            mb: 4
          }}
          onClose={() => { setError(false); }}
        >
          {'Incorrect credentials provided'}
        </Alert>
        : null}
      <Paper elevation={10} sx={{ py: 3, flexGrow: 1 }}>
        <Grid container display='flex' direction='column' alignItems='center'>
          <Grid item>
            <Image alt='branda logo' src='/branda-logo-long-2.png' width={150} height={60} />
          </Grid>
          <Divider sx={{ width: '90%', mt: 1 }} />
          <Grid item p={4} textAlign='center'>
            <FormControl>
              <Typography
                sx={{
                  fontFamily: 'sans-serif',
                  fontWeight: 400,
                  fontSize: '20px',
                  color: '#1B4370',
                  mb: 3
                }}
              >
                Branda Admin Login
              </Typography>
              <TextField
                id='username'
                label='Username'
                variant='standard'
                sx={{ my: 1 }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <TextField
                id='password'
                label='Password'
                variant='standard'
                type={showPW ? 'text' : 'password'}
                sx={{ my: 1 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <Button onClick={() => setShowPW(!showPW)}>{showPW ? 'hide password' : 'show password'}</Button>
              <Button
                sx={{ mt: 5 }}
                variant='contained'
                onClick={() => postSignInInfo()}
              >
                Login
              </Button>
              <FormHelperText sx={{ textAlign: 'center', mt: 3 }}>
                Please email{' '}
                <Link href='mailto: brandaapp@gmail.com'>brandaapp@gmail.com</Link>
                {' '}if you&apos;ve forgotten your login information!
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
