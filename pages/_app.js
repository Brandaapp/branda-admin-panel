import '../styles/globals.css';
import '../styles/materialize.css';
import { useEffect } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import LuxonUtils from '@date-io/luxon';
import Navbar from '../components/Navbar';

const inputTheme = createMuiTheme({ palette: { primary: { main: "#1B4370" } } });

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  
  function nav() {
    if (router.pathname !== '/login' && router.pathname !== '/register') {
      return (<div className="row"><Navbar /></div>);
    } else return null;
  }

  return (
    <div>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <ThemeProvider theme={inputTheme}>
          {nav()}
          <div className="row"><Component {...pageProps} /></div>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
