import '../styles/globals.css'
import '../styles/materialize.css'
import { useEffect } from 'react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { Provider } from 'next-auth/client'
import LuxonUtils from '@date-io/luxon'
import Navbar from '../components/Navbar'

const inputTheme = createMuiTheme({ palette: { primary: { main: "#1B4370" } } })

function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, []);
  
  function nav() {
    if (router.pathname !== '/login' && router.pathname !== '/register') {
      return (<div className="row"><Navbar /></div>)
    } else return null
  }

  return (
    <div>
      <Provider session={pageProps.session}>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <ThemeProvider theme={inputTheme}>
            {nav()}
            <div className="row"><Component {...pageProps} /></div>
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </Provider>
    </div>
  );
}

export default App
