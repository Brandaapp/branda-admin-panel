import '../styles/globals.css'
import '../styles/materialize.css'
import { useEffect } from 'react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { access } from '../utils/rolesUtils'
import { useRouter } from 'next/router'
import { getSession, Provider, signIn, useSession } from 'next-auth/client'
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
    if (router.pathname !== "/docs") {
      return (<div className="row"><Navbar /></div>)
    } else return null
  }

  return (
    <div style={{ height: "100%" }}>
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
    if (loading) return (
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", height: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src="/branda-admin-loading-gif.gif" style={{ width: "280px" }} />
        </div>
      </div>
    )
    if (!isUser && router.pathname !== "/login") signIn() // If not authenticated, force log in
    if (isUser) {
      if (access[session.user.type] === undefined) {
        console.error("Unrecognized user type")
      }
      if (!access[session.user.type].allowed.has(router.pathname)) {
        router.push(access[session.user.type].redirectTo)
      }
    }
  }, [isUser, loading])

  if (isUser || router.pathname === "/login") {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="/branda-admin-loading-gif.gif" style={{ width: "280px" }} />
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}

export default TLApp
