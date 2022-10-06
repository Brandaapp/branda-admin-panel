import { NextResponse } from 'next/server';
import { publicRoutes } from './utils/api/publicRoutes';

/**
 * This function does not use a Promise on the basis that using a Promise does not maintain
 * order of execution between middleware and endpoint. To make sure the DB is connected first,
 * we use async/await here instead.
 */
export async function middleware (req) {
  const { DB_ACCESS_TOKEN_SECRET: DB_ACCESS_TOKEN, API_TOKEN_SECRET } = process.env;
  const route = req.nextUrl.pathname;

  // `/api/admin` routes will typically have their own authentication process
  if (route.startsWith('/api/admin')) return NextResponse.next();
  else {
    try {
      // ensure DB connection
      await fetch(`${req.nextUrl.protocol}//${req.nextUrl.host}/api/admin/dbConnect`, {
        method: 'GET',
        headers: { DB_ACCESS_TOKEN }
      });

      // no authentication needed on public routes
      if (publicRoutes.has(route)) return NextResponse.next();
      else {
        const API_TOKEN = req.headers.get('api_token');
        // either the request was sent internally or an API key is provided
        if (API_TOKEN && API_TOKEN === API_TOKEN_SECRET) {
          return NextResponse.next();
        } else {
          // 401 auth
          return NextResponse.redirect(new URL('/api/errors/401', req.url));
        }
      }
    } catch (err) {
      // handle error to 500 (could not have been DB auth error, only internal error)
      return NextResponse.redirect(new URL('/api/errors/500', req.url));
    }
  }
}

// only check API requests
export const config = {
  matcher: '/api/:path*'
};
