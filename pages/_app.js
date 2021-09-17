import '../styles/globals.css'
import '../styles/materialize.css'
import App from 'next/app'
import { useEffect } from 'react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { Provider, signIn, useSession } from 'next-auth/client'
import { access } from '../utils/rolesUtils'
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
    if (pageProps.session && router.pathname !== "/docs") {
      return (<div className="row"><Navbar /></div>)
    } else return null
  }

  return (
    <div>
      <Provider session={pageProps.session}>
        <Auth>
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <ThemeProvider theme={inputTheme}>
              {nav()}
              <div className="row"><Component {...pageProps} /></div>
            </ThemeProvider>
          </MuiPickersUtilsProvider>
        </Auth>
      </Provider>
    </div>
  );
}

function Auth({ children }) {
  const [session, loading] = useSession()
  const router = useRouter()
  const isUser = !!session?.user
  useEffect(() => {
    if (loading) return // Do nothing while loading
    if (!isUser && router.pathname !== "/login") signIn() // If not authenticated, force log in
  }, [isUser, loading])

  if (isUser || router.pathname === "/login") {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}

/* TLApp.getInitialProps = async (appContext) => {
  const session = await getSession(appContext)
  const appProps = await App.getInitialProps(appContext)
  if (typeof window === "undefined" && appContext.ctx.res.writeHead) {
    if (!session) {
      if (appContext.router.pathname !== "/login" && appContext.router.pathname !== "/docs") {
        appContext.ctx.res.writeHead(302, { Location: "/login" })
        appContext.ctx.res.end()
      }
    } else if (
        !access[session.user.type].allowed.has(appContext.router.pathname) &&
        appContext.router.pathname !== "/docs"
      ) {
      appContext.ctx.res.writeHead(302, { Location: access[session.user.type].redirectTo })
      appContext.ctx.res.end()
    }
  }
  appProps.pageProps.session = session
  return { ...appProps }
} */

export default TLApp
