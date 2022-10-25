import '../styles/globals.css';
import '../styles/materialize.css';
import '../styles/mui.css';
import { useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from 'styled-components';
import { createTheme } from '@mui/material';
import { access } from '../utils/rolesUtils';
import { useRouter } from 'next/router';
import { getSession, Provider, signIn, useSession } from 'next-auth/client';
import Navbar from '../components/navbar/Navbar';
import Image from 'next/image';

// set global headers - all internal axios requests use our API token
import axios from 'axios';
axios.defaults.headers.common = {
  api_token: process.env.API_TOKEN_SECRET
};

// set up clone function for objects used in react hooks
JSON.clone = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};

const inputTheme = createTheme({ palette: { primary: { main: '#1B4370' } } });

function TLApp ({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  function nav () {
    if (router.pathname !== '/docs') {
      return (<div className="row"><Navbar /></div>);
    } else return null;
  }

  return (
    <div style={{ height: '100%' }}>
      <Provider session={pageProps.session}>
        <Auth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={inputTheme}>
              {nav()}
              <div className="row"><Component {...pageProps} /></div>
            </ThemeProvider>
          </LocalizationProvider>
        </Auth>
      </Provider>
    </div>
  );
}

function Auth ({ children }) {
  const [session, loading] = useSession();
  const router = useRouter();
  const isUser = !!session?.user;
  useEffect(() => {
    if (loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Image alt='' src="/branda-admin-loading-gif.gif" width={280} height={280} />
          </div>
        </div>
      );
    }
    if (!isUser && router.pathname !== '/login') signIn(); // If not authenticated, force log in
    if (isUser) {
      if (!access[session.user.type].allowed.has(router.pathname)) {
        router.push(access[session.user.type].redirectTo);
      }
    }
  }, [isUser, loading]);

  if (isUser || router.pathname === '/login') {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Image alt='' src="/branda-admin-loading-gif.gif" width={280} height={280} />
      </div>
    </div>
  );
}

export async function getServerSideProps (ctx) {
  return {
    props: {
      session: await getSession(ctx)
    }
  };
}

export default TLApp;
