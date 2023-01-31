export const access = {
  manager: {
    allowed: new Set([
      '/',
      '/docs',
      '/login',
      '/shuttles-management',
      '/announcements',
      '/schedules',
      '/register',
      '/push-notifications',
      '/clubs',
      '/knowledge-base'
    ]),
    redirectTo: '/'
  },
  employee: {
    allowed: new Set([
      '/',
      '/login'
    ]),
    redirectTo: '/'
  },
  publicsafety: {
    allowed: new Set([
      '/login',
      '/shuttles-management',
      '/push-notifications'
    ]),
    redirectTo: '/shuttles-management'
  },
  joseph: {
    allowed: new Set([
      '/login',
      '/shuttles-management',
      '/push-notifications'
    ]),
    redirectTo: '/shuttles-management'
  },
  organizationAdmin: {
    allowed: new Set([
      '/login',
      '/push-notifications'
    ]),
    redirectTo: '/push-notifications'
  }
};
