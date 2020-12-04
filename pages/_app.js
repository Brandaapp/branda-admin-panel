import '../styles/globals.css';
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import LuxonUtils from '@date-io/luxon';
import Navbar from '../components/Navbar';

function App({ Component, pageProps }) {
  return (
    <div>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <div className="row"><Navbar /></div>
        <div className="row"><Component {...pageProps} /></div>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
