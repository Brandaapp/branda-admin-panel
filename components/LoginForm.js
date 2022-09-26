import Link from 'next/link';
import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const Input = withStyles({ root: { width: '100% !important' } })(TextField);

export default function LoginForm () {
  const [ state, setState ] = useState({ username: '', password: '' });

  return (
    <div className="login-card">
      <h5 className="login-header">Login</h5>
      {/* Necessary to wrap in a form so the redirect to homepage after login works correctly */}
      <form action="/login" method="POST">
        <div className="login-label">Username</div>
        <div className="login-input">
          <Input
            placeholder="Enter username"
            size="small"
            variant="outlined"
            type="text"
            value={state.username}
            name="username"
            onChange={(e) => setState(prev => ({ ...prev, username: e.target.value }))}
          />
        </div>
        <div className="login-label">Password</div>
        <div className="login-input">
          <Input
            placeholder="Enter password"
            size="small"
            variant="outlined"
            type="text"
            value={state.password}
            name="password"
            onChange={(e) => setState(prev => ({ ...prev, password: e.target.value }))}
          />
        </div>
        <div className="login-input">
          <button className="btn waves-effect waves-light login-btn" type="submit"
            name="action">
                        Login
          </button>
        </div>
      </form>
      <div style={{ marginBottom: '5px' }}>
                Don&apost have an account? <Link href="/register">Sign Up</Link>
      </div>
    </div>
  );
}
