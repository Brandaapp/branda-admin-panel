import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import Image from 'next/image';
import axios from 'axios';
import { withStyles } from '@mui/styles';

const Input = withStyles({ root: { width: '100% !important', textAlign: 'left' } })(TextField);
const types = [
  { key: 'employee', label: 'Employee' },
  { key: 'manager', label: 'Manager' },
  { key: 'publicsafety', label: 'Public Safety' },
  { key: 'joseph', label: 'Joseph' },
  { key: 'organizationAdmin', label: 'Organization Admin' }
];

export default function Register () {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    passwordMatch: '',
    type: 'employee',
    showError: false,
    submitted: false
  });

  async function submit () {
    if (state.username === '' ||
      state.email === '' ||
      state.password === '' ||
      state.password !== state.passwordMatch ||
      state.type === ''
    ) setState(prev => ({ ...prev, showError: true }));
    else {
      await axios.post('/api/users', {
        username: state.username,
        email: state.email,
        userType: state.type,
        picture:
          'https://raw.githubusercontent.com/clsavino/react-shift-scheduler/master/public/assets/images/logo.png',
        password: state.password
      })
        .catch(() => {});
      setState({
        username: '',
        email: '',
        password: '',
        passwordMatch: '',
        type: 'employee',
        showError: false,
        submitted: true
      });
    }
  }

  if (!state.submitted) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Branda - Registration</title>
        </Head>

        <main className={styles.main} style={{ width: '100%' }}>
          <div className="row" style={{ width: '100%', marginTop: '4.8rem' }}>
            <div className="login-card">
              <h5 className="login-header">Register</h5>
              <div>
                <div className="login-label">Username</div>
                <div className="login-input">
                  <Input
                    placeholder="Enter username"
                    size="small"
                    variant="outlined"
                    type="text"
                    value={state.username}
                    error={state.showError && state.username === ''}
                    helperText={
                      state.showError && state.username === '' ? 'Username required' : ''
                    }
                    onChange={
                      (e) => setState(prev => ({ ...prev, username: e.target.value }))
                    }
                  />
                </div>
                <div className="login-label">Email</div>
                <div className="login-input">
                  <Input
                    placeholder="Enter email"
                    size="small"
                    variant="outlined"
                    type="text"
                    value={state.email}
                    error={state.showError && state.email === ''}
                    helperText={state.showError && state.email === '' ? 'Email required' : ''}
                    onChange={(e) => setState(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="login-label">Password</div>
                <div className="login-input">
                  <Input
                    placeholder="Enter password"
                    size="small"
                    variant="outlined"
                    type="password"
                    value={state.password}
                    error={state.showError && state.password === ''}
                    helperText={state.showError && state.password === '' ? 'Password required' : ''}
                    onChange={(e) => setState(prev => ({ ...prev, password: e.target.value }))}
                  />
                </div>
                <div className="login-label">Confirm Password</div>
                <div className="login-input">
                  <Input
                    placeholder="Enter password again"
                    size="small"
                    variant="outlined"
                    type="password"
                    value={state.passwordMatch}
                    error={state.showError && state.passwordMatch !== state.password}
                    helperText={state.showError && state.passwordMatch !== state.password
                      ? 'Passwords do not match' : ''}
                    onChange={(e) => setState(prev => ({ ...prev, passwordMatch: e.target.value }))}
                  />
                </div>
                <div className="login-label">Select Role</div>
                <div className="login-input">
                  <Input
                    select
                    size="small"
                    fullWidth
                    placeholder="Choose role"
                    value={state.type}
                    onChange={(e) => setState(prev => ({ ...prev, type: e.target.value }))}
                    variant="outlined"
                    SelectProps={{
                      MenuProps: {
                        anchorOrigin: {
                          vertical: 'bottom',
                          horizontal: 'left'
                        },
                        getContentAnchorEl: null
                      }
                    }}
                  >
                    {types.map(type => (
                      <MenuItem key={type.key} value={type.key}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Input>
                </div>
                <div className="login-input">
                  <button className="btn waves-effect waves-light login-btn" onClick={submit}>
                  Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
        </footer>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <Head>
          <title>Branda - Registration</title>
        </Head>

        <main className={styles.main} style={{ width: '100%' }}>
          <div className="row" style={{ textAlign: 'center' }}>
            <Image alt='' src="/admin-logo.png" width='100%' height='100%' style={{ marginBottom: '10px' }} />
          </div>
          <div className="row" style={{ width: '100%' }}>
            <div className="login-card">
              <h5 className="login-header">Account Created</h5>
              <div className="login-input">
                <button className="btn waves-effect waves-light login-btn-sm"
                  onClick={() => setState(prev => ({ ...prev, submitted: false }))}>
                Add Another Account
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
        </footer>
      </div>
    );
  }
}
