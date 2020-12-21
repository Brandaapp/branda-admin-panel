import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

//const Input = withStyles({ root: { width: "100% !important" } })(TextField);

export default function LoginForm() {
    const [ state, setState ] = useState({ username: "", password: "" });

    return (
        <div className="login-card">
            {/* Necessary to wrap in a form so the redirect to homepage after login works correctly */}
            <form action="/login" method="POST">
                <div className="login-input">
                    <div className="login-label">Username</div>
                    <TextField 
                        style={{ width: "100%" }}
                        placeholder="Enter username"
                        variant="outlined"
                        type="text"
                        value={state.username}
                        name="username"
                        onChange={(e) => setState(prev => ({ ...prev, username: e.target.value }))}
                    />
                </div>
                <div className="login-input">
                    <TextField 
                        style={{ width: "100%" }}
                        placeholder="Enter password"
                        variant="outlined"
                        type="text"
                        value={state.password}
                        name="password"
                        onChange={(e) => setState(prev => ({ ...prev, password: e.target.value }))}
                    />
                </div>
            </form>
        </div>
    );
}