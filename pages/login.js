import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { csrfToken } from 'next-auth/client';
import { withStyles } from '@mui/styles';

const Input = withStyles({ root: { width: '100% !important' } })(TextField);

export default function Login ({ csrfToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Login</title>
      </Head>

      <main className={styles.main} style={{ width: '100%' }}>
        <div className="row" style={{ textAlign: 'center' }}>
          <Image alt='' src="/admin-logo.png" width='100%' height='100%' style={{ marginBottom: '10px' }} />
        </div>
        <div className="row" style={{ width: '100%' }}>
          <div className="login-card">
            <h5 className="login-header">Login</h5>
            {/* Necessary to wrap in a form so the redirect to homepage after login works correctly */}
            <form action="/api/auth/callback/credentials" method="post">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <div className="login-label">Username</div>
              <div className="login-input">
                <Input
                  placeholder="Enter username"
                  size="small"
                  variant="outlined"
                  type="text"
                  value={username}
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="login-label">Password</div>
              <div className="login-input">
                <Input
                  placeholder="Enter password"
                  size="small"
                  variant="outlined"
                  type="password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="login-input">
                <button className="btn waves-effect waves-light login-btn" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
}

Login.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context)
  };
};
