# Changelog

## [1.0.0] - TBD

### Added

- Refactored navigation bar links to be dynamic instead of separate files. 
    This will make adding different user types in the future smoother.
- Switched from MUI 4 (Material UI) to MUI 5, and removed dependencies on `materialize.css`
- UI Re-work: All pages, redesigned for practicality, and for mobile devices
    - *Navbar*: dynamic sizing change to either have list of links on the top, or in a slideable drawer
    - *Login*: Login form now looks and functions better with appropriate error message on failed login
    - *Schedules Page and Home Page*: Simpler UI for schedule editing so the page doesn't seem too crowded. Home page
        features similar features as before, with a better UI. ALl functionality from before remains.
- API endpoints
- Documentation: All API endpoints, both publically available and not, are documented using the OpenAPI 3.0 specification
    using Redoc. More info can be seen in the README for this repository. 

### Fixed

- Fixed an issue where not providing a field on login will redirect to `401` error

## [0.2.0] - October 10, 2022

### Added

- All routes within the API now use Promises
- API routes that `fetch` from external routes now have appropriate error handling
- Server-side logging using `bunyan`
- `dbConnect` functionality now has API endpoint
    - GET `/api/admin/dbConnect`
    - Protected behind auth
- All routes now pass through `middleware` function
    - first calls `dbConnect` endpoint
    - then authenticates route based on set of available public routes
    - redirects to approproate `401` or `500` errors
- All `/getinfo` resources now return the success status of their operation, to unify behavior, and for clear 
    understanding in public use

### Fixed

- Removed `MaterialUI` error by changing from deprecated `createMuiTheme` to `createTheme` in `pages/_app.js`
- Login form now has password field type as `password` instead of `text`
- Login form now no longer inconsistently logs in or doesn't log in user
- Fixed bug in news cron job where rejected promises for links fetched from Brandies page were trying to be evaluated
- All uses of `mongoose.Schema.find` that were designed to only return one element, and checked for such, now correctly
    use `mongoose.Schema.findOne`
- Optimized `/getinfo/gymTimes` route

### Dev Tools

- Linter now works properly (uses standard ESLint and Next.js rules)

## [0.1.0] - September 19, 2022

### Added

- Migrated legacy API routes
    - GET /api/branvan/get/shuttleRouteShedule/{name}
    - GET /api/branvan/get/shuttleRouteShedule
    - GET /api/branvan/get/stops/{route}
    - GET /api/branvan/get/stops
    - GET /api/getDiningHours
    - GET /api/getinfo/brandeisclubs/approved
    - GET /api/getinfo/branvan/available/{date}/{minHr}
    - GET /api/getinfo/branvan/josephs_running
    - GET /api/getinfo/branvan/notifications
    - DELETE /api/getinfo/deletePushTokenFromOrganization
    - GET /api/getinfo/getEvents
    - GET /api/getinfo/gymTimes
    - GET /api/getinfo/kb/getAppKb
    - GET /api/getinfo/libraryHours/today
    - GET /api/getinfo/libraryHours/week
    - GET /api/getinfo/news
    - POST /api/getinfo/pushtokens

### Changed

- Cron jobs
    - fixed internal structure and updated endpoints
        - PATCH /api/cron/replaceTags
        - PATCH /api/cron/updateDiningHours
        - PATCH /api/cron/updateNews
    - added actions to GitHub Actions workflow
        - replaceTags on cron schedule `"*/15 * * * *"`
        - updateDiningHours and updateNews on cron schedule `"30 */12 * * *"`
- Updated internal dependencies