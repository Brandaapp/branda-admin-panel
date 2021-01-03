import '../styles/globals.css'
import '../styles/materialize.css'
import App from 'next/app'
import { useEffect } from 'react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { Provider, getSession } from 'next-auth/client'
import LuxonUtils from '@date-io/luxon'
import Navbar from '../components/Navbar'

const inputTheme = createMuiTheme({ palette: { primary: { main: "#1B4370" } } })

function TLApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, []);
  
  function nav() {
    if (pageProps.session) {
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

TLApp.getInitialProps = async (appContext) => {
  const session = await getSession(appContext)
  const appProps = await App.getInitialProps(appContext)
  if (typeof window === "undefined" && appContext.ctx.res.writeHead) {
    if (!session && appContext.router.pathname !== "/login") {
      appContext.ctx.res.writeHead(302, { Location: "/login" })
      appContext.ctx.res.end()
    }
  }
  appProps.pageProps.session = session
  return { ...appProps }
}

export default TLApp
