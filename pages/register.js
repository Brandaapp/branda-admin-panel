import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

const axios = require('axios')
const Input = withStyles({ root: { width: "100% !important", textAlign: "left" } })(TextField)
const types = [
  { key: "employee", label: "Employee" },
  { key: "manager", label: "Manager" },
  { key: "publicsafety", label: "Public Safety" },
  { key: "joseph", label: "Joseph" }
]

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordMatch, setPasswordMatch] = useState("")
  const [type, setType] = useState("employee")
  const [showError, setShowError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  async function submit() {
    if (username === ""
      || email === ""
      || password === ""
      || password !== passwordMatch
      || type === ""
    ) setShowError(true)
    else {
      await axios.post('/api/users', {
        username: username,
        email: email,
        userType: type,
        picture: "https://raw.githubusercontent.com/clsavino/react-shift-scheduler/master/public/assets/images/logo.png",
        password: password
      })
      .catch(err => console.log("Error creating user"))
      setSubmitted(true)
    }
  }


  if (!submitted) return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Registration</title>
      </Head>

      <main className={styles.main} style={{ width: "100%" }}>
        <div className="row" style={{ textAlign: "center" }}>
          <img src="/admin-logo.png" style={{ width: "15%", marginBottom: "10px" }} />
        </div>
        <div className="row" style={{ width: "100%" }}>
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
                  value={username}
                  error={showError && username === ""}
                  helperText={showError && username === "" ? "Username required" : ""}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="login-label">Email</div>
              <div className="login-input">
                <Input
                  placeholder="Enter email"
                  size="small"
                  variant="outlined"
                  type="text"
                  value={email}
                  error={showError && email === ""}
                  helperText={showError && email === "" ? "Email required" : ""}
                  onChange={(e) => setEmail(e.target.value)}
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
                  error={showError && password === ""}
                  helperText={showError && password === "" ? "Password required" : ""}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="login-label">Confirm Password</div>
              <div className="login-input">
                <Input
                  placeholder="Enter password again"
                  size="small"
                  variant="outlined"
                  type="password"
                  value={passwordMatch}
                  error={showError && passwordMatch !== password}
                  helperText={showError && passwordMatch !== password ? "Passwords do not match" : ""}
                  onChange={(e) => setPasswordMatch(e.target.value)}
                />
              </div>
              <div className="login-label">Select Role</div>
              <div className="login-input">
                <Input
                  select
                  size="small"
                  fullWidth
                  placeholder="Choose role"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  variant="outlined"
                  SelectProps={{
                    MenuProps: {
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
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
            <div style={{ marginBottom: "5px" }}>
              Already have an account? <Link href="/login">Sign In</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
  else return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Registration</title>
      </Head>

      <main className={styles.main} style={{ width: "100%" }}>
        <div className="row" style={{ textAlign: "center" }}>
            <img src="/admin-logo.png" style={{ width: "15%", marginBottom: "10px" }} />
        </div>
        <div className="row" style={{ width: "100%" }}>
          <div className="login-card">
            <h5 className="login-header">Account Created</h5>
            <div className="login-input">
              <button className="btn waves-effect waves-light login-btn-sm"
                onClick={() => router.push('/login')}>
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}