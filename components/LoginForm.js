import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const Input = withStyles({ root: { width: "100% !important" } })(TextField);

export default function LoginForm() {
    const [ state, setState ] = useState({ username: "", password: "" });

    return (
        <div className="login-card">
            {/* Necessary to wrap in a form so the redirect to homepage after login works correctly */}
            <form action="/login" method="POST">
                <span className="input-label">Username:</span>
                <Input 
                    placeholder="Enter username"
                    type="text"
                    value={state.username}
                    name="username"
                    onChange={(e) => setState(prev => ({ ...prev, username: e.target.value }))}
                    required
                />
                <span className="input-label">Password:</span>
                <Input 
                    placeholder="Enter password"
                    type="text"
                    value={state.password}
                    name="password"
                    onChange={(e) => setState(prev => ({ ...prev, password: e.target.value }))}
                    required
                />
            </form>
        </div>
    );
}