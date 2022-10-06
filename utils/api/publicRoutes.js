export const publicRoutes = new Set([
  // error routes/pages can always be public, although accessing them won't really do much
  '/api/errors/401',
  '/api/errors/500',

  // publically accessible 'data-based' routes
  '/api/getinfo/brandeisclubs/approved',
  '/api/getinfo/getEvents',
  '/api/getinfo/getSchedules',
  '/api/getinfo/gymTimes',
  '/api/getinfo/libraryHours/today',
  '/api/getinfo/libraryHours/week',
  '/api/getinfo/news',

  // auth paths need to be public, but won't do much without proper
  '/api/auth/session',
  '/api/auth/_log',
  '/api/auth/providers',
  '/api/auth/callback/credentials',
  '/api/auth/csrf',
  '/api/auth/signin',
  '/api/auth/signout'
]);
